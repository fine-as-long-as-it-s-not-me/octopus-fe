import { createContext, useContext } from 'react'

type SoundContextType = {
  isEffectMuted: boolean
  isMusicMuted: boolean
  playSoundEffect: (key: string) => void
  muteSoundEffectToggle: () => void
  playMusic: (key: string) => void
  pauseMusic: () => void
  muteMusicToggle: () => void
  setMusicVolume: (volume: number) => void
  setEffectVolume: (volume: number) => void
  musicVolume: number
  effectVolume: number
}

export const SoundContext = createContext<SoundContextType | null>(null)

export const useSound = () => {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within SoundProvider')
  return ctx
}
