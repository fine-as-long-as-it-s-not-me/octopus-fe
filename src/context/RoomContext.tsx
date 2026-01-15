import { createContext, useContext } from 'react'

import type { Phase, Player, Setting } from '@/types'

type RoomContextType = {
  roomCode: string
  players: Player[]
  phase: Phase
  phaseDescription: string
  timeLeft: number
  round: number
  setting: Setting
  startGame: () => void
  setRoomCode: (code: string) => void
}

export const RoomContext = createContext<RoomContextType | null>(null)

export const useRoom = () => {
  const ctx = useContext(RoomContext)
  if (!ctx) throw new Error('useRoom must be used within RoomProvider')
  return ctx
}
