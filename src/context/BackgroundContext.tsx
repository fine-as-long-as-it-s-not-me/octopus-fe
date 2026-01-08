import { createContext, useContext } from 'react'

type BackgroundContextType = {
  interacted: boolean
  isMuted: boolean
  setInteracted: (interacted: boolean) => void
  playMusic: (key: string) => void
  muteMusicToggle: () => void
  setBackgroundImage: (key: string) => void
}

export const BackgroundContext = createContext<BackgroundContextType | null>(
  null,
)

export const useBackground = () => {
  const ctx = useContext(BackgroundContext)
  if (!ctx) throw new Error('useBackground must be used within AssetProvider')
  return ctx
}
