import { createContext, useContext } from 'react'

import type { ErrorType, Stroke } from '@/types'

type SocketContextType = {
  startGame: () => void
  DEV_nextPhase: () => void // for dev
  addStroke: (stroke: Stroke) => void
  joinRoom: (roomCode: string) => void
  joinRandomRoom: () => void
  leaveRoom: () => void
  setError: (error: null | ErrorType) => void
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const useSocket = () => {
  const ctx = useContext(SocketContext)
  if (!ctx) throw new Error('useSocket must be used within SocketProvider')
  return ctx
}
