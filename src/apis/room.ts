import { useSocket } from '@/context/SocketContext'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'
import type { ChangeableSettings } from '@/types'

export function useJoinRoom() {
  const { sendMessage } = useSocket()
  const { name, UUID } = useUserStore()

  return {
    mutate: (roomCode: string) =>
      sendMessage('room', 'join', { roomCode, name, UUID }),
  }
}
export function useCreateRoom() {
  const { sendMessage } = useSocket()

  return {
    mutate: (settings: ChangeableSettings) =>
      sendMessage('room', 'create', { settings }),
  }
}

export function useChangeRoomSettings() {
  const { sendMessage } = useSocket()
  const { roomCode } = useRoomStore()

  return {
    mutate: (settings: ChangeableSettings) =>
      sendMessage('room', 'change_settings', { roomCode, settings }),
  }
}

export function useLeaveRoom() {
  const { sendMessage } = useSocket()
  const { roomCode, setRoomCode } = useRoomStore()

  return {
    mutate: () => {
      sendMessage('room', 'leave', { roomCode })
      setRoomCode('')
    },
  }
}

export function useLogin() {
  const { sendMessage } = useSocket()
  const { name, UUID } = useUserStore()

  return {
    mutate: (_name?: string) =>
      sendMessage('player', 'login', { name: _name ?? name, UUID }),
  }
}

export function useJoinRandomRoom() {
  const { sendMessage } = useSocket()
  const { name, UUID } = useUserStore()

  return {
    mutate: () => sendMessage('room', 'join_random', { name, UUID }),
  }
}
