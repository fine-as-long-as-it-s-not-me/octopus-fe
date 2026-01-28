import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type Score } from '@/types'

interface GameState {
  isStarted: boolean
  setIsStarted: (isStarted: boolean) => void

  scores: Score[]
  setScores: (scores: Score[]) => void

  round: number
  setRound: (round: number) => void

  init: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    set => ({
      isStarted: false,
      setIsStarted: isStarted => set({ isStarted }),

      scores: [],
      setScores: scores => set({ scores }),
      round: 0,

      setRound: round => set({ round }),

      init: () =>
        set(() => ({
          isStarted: false,
          scores: [],
          round: 0,
        })),
    }),
    {
      name: 'game-storage',
    },
  ),
)
