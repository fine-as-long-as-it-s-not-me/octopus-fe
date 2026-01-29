import { createContext, useContext } from 'react'

type BackgroundContextType = {
  interacted: boolean
  setInteracted: (value: boolean) => void
  setBackgroundImage: (key: string) => void
}

export const BackgroundContext = createContext<BackgroundContextType | null>(
  null,
)

export const useBackground = () => {
  const ctx = useContext(BackgroundContext)
  if (!ctx)
    throw new Error('useBackground must be used within BackgroundProvider')
  return ctx
}
