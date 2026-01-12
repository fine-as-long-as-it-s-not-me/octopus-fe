import { createContext, useContext, type ReactNode } from 'react'

import type { Player } from '@/types'

type RoomContextType = {
  roomCode: string
  closeButton: ReactNode
  players: Player[]
  setPlayers: (players: Player[]) => void
  setCloseButton: (button: ReactNode) => void
  setRoomCode: (code: string) => void
}

export const RoomContext = createContext<RoomContextType | null>(null)

export const useRoom = () => {
  const ctx = useContext(RoomContext)
  if (!ctx) throw new Error('useRoom must be used within RoomProvider')
  return ctx
}
