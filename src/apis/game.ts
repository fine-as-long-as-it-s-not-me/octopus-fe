import { useSocket } from '@/context/SocketContext'

export function useStartGame() {
  const { sendMessage } = useSocket()
  return { mutate: () => sendMessage('game', 'start') }
}

export function useUpdateDiscussionTime() {
  const { sendMessage } = useSocket()
  return {
    mutate: (type: 'increase' | 'decrease') =>
      sendMessage(
        'discussion',
        type === 'increase' ? 'increase_time' : 'decrease_time',
      ),
  }
}

export function useVoteOctopus() {
  const { sendMessage } = useSocket()
  return {
    mutate: (targetUUID: string) => sendMessage('vote', 'cast', { targetUUID }),
  }
}

export function useGuessWord() {
  const { sendMessage } = useSocket()
  return {
    mutate: (word: string) => sendMessage('game', 'guess', { word }),
  }
}
