import { createContext, useContext } from 'react'

export interface ScreenSize {
  sm: boolean
  md: boolean
  lg: boolean
}

type WindowContextType = {
  size: ScreenSize
}

export const WindowContext = createContext<WindowContextType | null>(null)

export const useWindow = () => {
  const ctx = useContext(WindowContext)
  if (!ctx) throw new Error('useWindow must be used within WindowProvider')
  return ctx
}
