import { createContext, useContext } from 'react'

type AssetContextType = {
  images: Record<string, HTMLImageElement>
  backgrounds: {
    desktop: Record<string, HTMLImageElement>
    mobile: Record<string, HTMLImageElement>
  }
  sounds: Record<string, HTMLAudioElement>
  loading: boolean
  progress: number // 0–100
  avatarCache: Record<string, string>
  setAvatarCache: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

export const AssetContext = createContext<AssetContextType | null>(null)

export const useAssets = () => {
  const ctx = useContext(AssetContext)
  if (!ctx) throw new Error('useAssets must be used within AssetProvider')
  return ctx
}
