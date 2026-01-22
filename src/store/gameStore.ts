import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Phase, Score, Stroke } from '@/types'
import { mockPlayers } from './roomStore'

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

      painterId: null,
      setPainterId: painterId => set({ painterId }),

      strokes: mockStrokes,
      setStrokes: strokes => set({ strokes }),

      canvasColor: '#ffffff',
      setCanvasColor: canvasColor => set({ canvasColor }),
    }),
    {
      name: 'game-storage',
    },
  ),
)

const mockScores: Score[] = mockPlayers.map((player, index) => ({
  player,
  delta: (index + 1) * 10,
  total: 1000 - (index + 1) * 30,
}))
const mockStrokes: Stroke[] = [
  {
    id: 1,
    sequence: 0,
    type: 'pen',
    color: '#ff0000',
    strokeWidth: 5,
    points: [
      { x: 100, y: 100 },
      { x: 150, y: 150 },
      { x: 200, y: 100 },
    ],
  },
  {
    id: 1,
    sequence: 1,
    type: 'pen',
    color: '#00ff00',
    strokeWidth: 10,
    points: [
      { x: 300, y: 300 },
      { x: 350, y: 350 },
      { x: 400, y: 300 },
    ],
  },
]
