import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Phase, Score, Stroke } from '@/types'
import { mockScores, mockStrokes } from './mocks'

interface GameState {
  phase: Phase
  setPhase: (phase: Phase) => void

  timeLeft: number
  setTimeLeft: (timeLeft: number) => void

  scores: Score[]
  setScores: (scores: Score[]) => void

  keyword: string
  setKeyword: (keyword: string) => void

  round: number
  setRound: (round: number) => void

  painterId: string | null
  setPainterId: (painterId: string | null) => void

  strokes: Stroke[]
  setStrokes: (strokes: Stroke[]) => void
  addStroke: (stroke: Stroke) => void

  canvasColor: string
  setCanvasColor: (canvasColor: string) => void
}

export const useGameStore = create<GameState>()(
  persist(
    set => ({
      phase: 'waiting',
      setPhase: phase => set({ phase }),

      timeLeft: 0,
      setTimeLeft: timeLeft => set({ timeLeft }),

      scores: mockScores,
      setScores: scores => set({ scores }),

      keyword: '',
      setKeyword: keyword => set({ keyword }),

      round: 0,
      setRound: round => set({ round }),

      painterId: '1',
      setPainterId: painterId => set({ painterId }),

      strokes: mockStrokes,
      setStrokes: strokes => set({ strokes }),
      addStroke: stroke =>
        set(state => ({ strokes: [...state.strokes, stroke] })),

      canvasColor: '#ffffff',
      setCanvasColor: canvasColor => set({ canvasColor }),
    }),
    {
      name: 'game-storage',
    },
  ),
)
