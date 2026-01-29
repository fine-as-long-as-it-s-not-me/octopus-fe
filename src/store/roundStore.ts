import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DEFAULT_STROKE_WIDTH } from '@/consts'
import { Phase, type Player, type Stroke, type ToolType } from '@/types'

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

  votedPlayer: Player | null
  setVotedPlayer: (votedPlayer: Player) => void

  tied: boolean
  setTied: (tied: boolean) => void

  guessed: boolean
  setGuessed: (guessed: boolean) => void

  isUnanimity: boolean
  setIsUnanimity: (isUnanimity: boolean) => void

  octopuses: Player[]
  setOctopuses: (octopuses: Player[]) => void

  init: () => void
}

export const useRoundStore = create<RoundState>()(
  persist(
    set => ({
      phase: Phase.OUT,
      setPhase: phase => set({ phase }),

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

      votedPlayer: null,
      setVotedPlayer: votedPlayer => set({ votedPlayer }),

      tied: false,
      setTied: tied => set({ tied }),

      guessed: false,
      setGuessed: guessed => set({ guessed }),

      isUnanimity: false,
      setIsUnanimity: isUnanimity => set({ isUnanimity }),

      octopuses: [],
      setOctopuses: octopuses => set({ octopuses }),

      init: () =>
        set(() => ({
          phase: Phase.OUT,
          timeLeft: 0,
          keyword: '',

          painterUUID: null,
          nextPainterUUID: null,
          tool: 'pen',
          strokeColor: '#000000',
          strokeWidth: DEFAULT_STROKE_WIDTH,

          strokes: [],
          canvasColor: '#ffffff',

          voteResult: {},
          tied: false,
          guessed: false,
          isUnanimity: false,
          octopuses: [],
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
                'octopuses',
                'strokeColor',
                'strokeWidth',
                'tool',
                'votedPlayer',
              ].includes(key),
          ),
        ),
    },
  ),
)
