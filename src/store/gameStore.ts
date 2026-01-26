import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DEFAULT_STROKE_WIDTH } from '@/consts'
import { Phase, type Score, type Stroke, type ToolType } from '@/types'

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

  nextPainterUUID: string | null
  setNextPainterUUID: (nextPainterUUID: string | null) => void

  strokes: Stroke[]
  setStrokes: (strokes: Stroke[]) => void
  addStroke: (stroke: Stroke) => void

  strokeColor: string
  setStrokeColor: (strokeColor: string) => void

  strokeWidth: number
  setStrokeWidth: (strokeWidth: number) => void

  tool: ToolType
  setTool: (tool: ToolType) => void

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

      nextPainterUUID: null,
      setNextPainterUUID: nextPainterUUID => set({ nextPainterUUID }),

      strokeColor: '#000000',
      setStrokeColor: strokeColor => set({ strokeColor }),

      strokes: [],
      setStrokes: strokes => set({ strokes }),
      addStroke: stroke =>
        set(state => ({ strokes: [...state.strokes, stroke] })),

      strokeWidth: DEFAULT_STROKE_WIDTH,
      setStrokeWidth: strokeWidth => set({ strokeWidth }),

      tool: 'pen',
      setTool: tool => set({ tool }),

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
          nextPainterUUID: null,
          strokes: [],
          strokeColor: '#000000',
          canvasColor: '#ffffff',
          tool: 'pen',
          strokeWidth: DEFAULT_STROKE_WIDTH,
          strokes: [],
        })),
    }),
    {
      name: 'game-storage',
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['painterUUID', 'nextPainterUUID'].includes(key),
          ),
        ),
    },
  ),
)
