import { createContext, useContext } from 'react'

export interface ScreenSize {
  sm: boolean
  md: boolean
  lg: boolean
}

type WindowContextType = {
  size: ScreenSize
  direction: 'vertical' | 'horizontal'
  isCompact: boolean
  setIsCompact: (isCompact: boolean) => void
}

export const WindowContext = createContext<WindowContextType | null>(null)

export const useWindow = () => {
  const ctx = useContext(WindowContext)
  if (!ctx) throw new Error('useWindow must be used within WindowProvider')
  return ctx
}
