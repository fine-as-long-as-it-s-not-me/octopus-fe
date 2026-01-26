import { useSocket } from '@/context/SocketContext'

export function useStartGame() {
  const { sendMessage } = useSocket()
  return { mutate: () => sendMessage('game', 'start') }
}
