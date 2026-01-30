import type { ChangeableSettings } from '@/types'
import { useMutation } from './base'

export function useCreateRoom() {
  return useMutation<{ settings: ChangeableSettings }>('room', 'create')
}

export function useJoinRoom() {
  return useMutation<{ roomCode: string; UUID: string }>('room', 'join')
}

export function useJoinRandomRoom() {
  return useMutation<{ UUID: string }>('room', 'join_random')
}

export function useChangeRoomSettings() {
  return useMutation<{ settings: ChangeableSettings }>(
    'room',
    'change_settings',
  )
}

export function useLeaveRoom() {
  return useMutation<{ roomCode: string }>('room', 'leave')
}
