import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Phase, type Score, type Stroke } from '@/types'

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

  painterUUID: string | null
  setPainterUUID: (painterUUID: string | null) => void

  strokes: Stroke[]
  strokeColor: string
  setStrokeColor: (strokeColor: string) => void
  setStrokes: (strokes: Stroke[]) => void
  addStroke: (stroke: Stroke) => void

  canvasColor: string
  setCanvasColor: (canvasColor: string) => void

  flush: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    set => ({
      phase: Phase.OUT,
      setPhase: phase => {
        if (phase === Phase.KEYWORD)
          set({ strokes: [], phase, strokeColor: '#000000' })
        else set({ phase })
      },

      timeLeft: 0,
      setTimeLeft: timeLeft => set({ timeLeft }),

      scores: [],
      setScores: scores => set({ scores }),

      keyword: '',
      setKeyword: keyword => set({ keyword }),

      round: 0,
      setRound: round => set({ round }),

      painterUUID: null,
      setPainterUUID: painterUUID => set({ painterUUID }),

      strokes: [],
      strokeColor: '#000000',
      setStrokeColor: strokeColor => set({ strokeColor }),
      setStrokes: strokes => set({ strokes }),
      addStroke: stroke =>
        set(state => ({ strokes: [...state.strokes, stroke] })),

      canvasColor: '#ffffff',
      setCanvasColor: canvasColor => set({ canvasColor }),

      flush: () =>
        set(() => ({
          phase: Phase.OUT,
          timeLeft: 0,
          scores: [],
          keyword: '',
          round: 0,
          painterUUID: null,
          strokes: [],
          strokeColor: '#000000',
          canvasColor: '#ffffff',
        })),
    }),
    {
      name: 'game-storage',
    },
  ),
)
