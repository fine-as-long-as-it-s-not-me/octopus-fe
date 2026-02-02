import { createContext, useContext } from 'react'

type SocketContextType = {
  sendMessage: (
    mainType: string,
    subType: string,
    data?: Record<string, unknown> | void,
  ) => void
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const useSocket = () => {
  const ctx = useContext(SocketContext)
  if (!ctx) throw new Error('useSocket must be used within SocketProvider')
  return ctx
}
