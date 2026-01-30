import { useSocket } from '@/context/SocketContext'

export function useTest() {
  const { sendMessage } = useSocket()

  return {
    mutate: () => sendMessage('game', 'start'),
  }
}
