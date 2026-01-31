import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type Rank } from '@/types'

interface GameState {
  ranks: Rank[]
  setRanks: (ranks: Rank[]) => void

  round: number
  setRound: (round: number) => void

  init: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    set => ({
      ranks: [],
      setRanks: ranks => set({ ranks }),
      round: 0,

      setRound: round => set({ round }),

      init: () =>
        set(() => ({
          ranks: [],
          round: 0,
        })),
    }),
    {
      name: 'game-storage',
    },
  ),
)
