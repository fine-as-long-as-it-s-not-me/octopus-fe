import { createContext, useContext } from 'react'

import type { ChangeableSettings, ErrorType, Stroke } from '@/types'

type SocketContextType = {
  joinRandomRoom: () => void
  startGame: () => void
  DEV_nextPhase: () => void // for dev
  addStroke: (stroke: Stroke) => void
  createRoom: (settings: ChangeableSettings) => void
  changeSettings: (settings: ChangeableSettings) => void
  joinRoom: (roomCode: string) => void
  leaveRoom: () => void
  setError: (error: null | ErrorType) => void
  login: () => void
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const useSocket = () => {
  const ctx = useContext(SocketContext)
  if (!ctx) throw new Error('useSocket must be used within SocketProvider')
  return ctx
}
