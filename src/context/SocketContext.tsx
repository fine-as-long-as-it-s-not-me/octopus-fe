import { createContext, useContext } from 'react'

import type { ErrorType } from '@/types'

type SocketContextType = {
  setError: (error: null | ErrorType) => void
  sendMessage: (
    mainType: string,
    subType: string,
    data?: Record<string, unknown>,
  ) => void
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const useSocket = () => {
  const ctx = useContext(SocketContext)
  if (!ctx) throw new Error('useSocket must be used within SocketProvider')
  return ctx
}
