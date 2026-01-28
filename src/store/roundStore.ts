import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DEFAULT_STROKE_WIDTH } from '@/consts'
import { Phase, type Stroke, type ToolType } from '@/types'

interface RoundState {
  phase: Phase
  setPhase: (phase: Phase) => void

  keyword: string
  setKeyword: (keyword: string) => void

  timeLeft: number
  setTimeLeft: (timeLeft: number) => void

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

  voteResult: Record<string, number>
  setVoteResult: (voteResult: Record<string, number>) => void

  octopusUUIDs: string[]
  setOctopusUUIDs: (octopusUUIDs: string[]) => void

  init: () => void
}

export const useRoundStore = create<RoundState>()(
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

      keyword: '',
      setKeyword: keyword => set({ keyword }),

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

      voteResult: {},
      setVoteResult: voteResult => set({ voteResult }),

      octopusUUIDs: [],
      setOctopusUUIDs: octopusUUIDs => set({ octopusUUIDs }),

      init: () =>
        set(() => ({
          phase: Phase.OUT,
          timeLeft: 0,
          keyword: '',
          painterUUID: null,
          nextPainterUUID: null,
          tool: 'pen',
          strokes: [],
          canvasColor: '#ffffff',
        })),
    }),
    {
      name: 'game-storage',
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) =>
              ![
                'painterUUID',
                'nextPainterUUID',
                'octopusUUIDs',
                'strokeColor',
                'tool',
              ].includes(key),
          ),
        ),
    },
  ),
)
