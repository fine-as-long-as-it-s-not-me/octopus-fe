import { createContext, useContext } from 'react'

import type { Phase, Player, Score, Setting, Stroke } from '@/types'

type RoomContextType = {
  strokes: Stroke[]
  bgColor: string
  roomCode: string | null
  players: Player[]
  phase: Phase
  timeLeft: number
  round: number
  setting: Setting
  scores: Score[]
  painterId: string | null
  keyword: string
  startGame: () => void
  nextPhase: () => void // for dev
  addStroke: (stroke: Stroke) => void // for dev
  joinRoom: (roomCode: string, name: string) => void
  leaveRoom: () => void
}

export const RoomContext = createContext<RoomContextType | null>(null)

export const useRoom = () => {
  const ctx = useContext(RoomContext)
  if (!ctx) throw new Error('useRoom must be used within RoomProvider')
  return ctx
}
