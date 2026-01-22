import { createContext, useContext } from 'react'

import type { Stroke } from '@/types'

type SocketContextType = {
  startGame: () => void
  nextPhase: () => void // for dev
  addStroke: (stroke: Stroke) => void // for dev
  joinRoom: (roomCode: string) => void
  joinRandomRoom: () => void
  leaveRoom: () => void
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const useSocket = () => {
  const ctx = useContext(SocketContext)
  if (!ctx) throw new Error('useSocket must be used within SocketProvider')
  return ctx
}
