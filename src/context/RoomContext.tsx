import { createContext, useContext } from 'react'

import type { Phase, Player, Score, Setting, Vector } from '@/types'

type RoomContextType = {
  strokes: Vector[]
  bgColor: string
  roomCode: string
  players: Player[]
  phase: Phase
  timeLeft: number
  round: number
  setting: Setting
  scores: Score[]
  startGame: () => void
  setRoomCode: (code: string) => void
  nextPhase: () => void // for dev
}

export const RoomContext = createContext<RoomContextType | null>(null)

export const useRoom = () => {
  const ctx = useContext(RoomContext)
  if (!ctx) throw new Error('useRoom must be used within RoomProvider')
  return ctx
}
