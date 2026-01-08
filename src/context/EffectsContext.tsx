import { createContext, useContext } from 'react'

type EffectContextType = {
  isMuted: boolean
  playSoundEffect: (key: string) => void
  muteSoundEffectToggle: () => void
}

export const EffectsContext = createContext<EffectContextType | null>(null)

export const useEffects = () => {
  const ctx = useContext(EffectsContext)
  if (!ctx) throw new Error('useEffect must be used within EffectProvider')
  return ctx
}
