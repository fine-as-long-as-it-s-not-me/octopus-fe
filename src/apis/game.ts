import { useMutation } from './base'

export function useStartGame() {
  return useMutation<void>('game', 'start')
}

export function useUpdateDiscussionTime() {
  return useMutation<{ type: 'increase' | 'decrease' }>(
    'discussion',
    'change_time',
  )
}

export function useVoteOctopus() {
  return useMutation<{ targetUUID: string }>('vote', 'cast')
}

export function useGuessWord() {
  return useMutation<{ word: string }>('game', 'guess')
}
