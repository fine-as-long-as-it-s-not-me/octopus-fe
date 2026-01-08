import { useEffect, useState, type ReactNode } from 'react'

import {
  avatarAssets,
  desktopBgAssets,
  mobileBgAssets,
  musicAssets,
  soundEffectsAssets,
} from '@/assets'
import { loadAudio, loadImage } from '@/utils/loaders'
import { AssetContext } from './AssetContext'

type Props = { children: ReactNode }

export const AssetProvider = ({ children }: Props) => {
  // 기본 에셋
  const [images, setImages] = useState<Record<string, HTMLImageElement>>({})
  const [backgrounds, setBackgrounds] = useState<{
    desktop: Record<string, HTMLImageElement>
    mobile: Record<string, HTMLImageElement>
  }>({ desktop: {}, mobile: {} })
  const [sounds, setSounds] = useState<Record<string, HTMLAudioElement>>({})
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const loadAll = async () => {
      const imageEntries = Object.entries(avatarAssets).map(([k, v]) => ({
        key: k,
        loader: () => loadImage(v),
      }))

      const desktopBgEntries = Object.entries(desktopBgAssets).map(
        ([k, v]) => ({
          key: k,
          loader: () => loadImage(v),
        }),
      )
      const mobileBgEntries = Object.entries(mobileBgAssets).map(([k, v]) => ({
        key: k,
        loader: () => loadImage(v),
      }))
      const soundEntries = [
        ...Object.entries(soundEffectsAssets).map(([k, v]) => ({
          key: k,
          loader: () => loadAudio(v),
        })),
        ...Object.entries(musicAssets).map(([k, v]) => ({
          key: k,
          loader: () => loadAudio(v),
        })),
      ]

      const total =
        imageEntries.length +
        soundEntries.length +
        desktopBgEntries.length +
        mobileBgEntries.length

      let loaded = 0
      const images: Record<string, HTMLImageElement> = {}
      const backgrounds = {
        desktop: {} as Record<string, HTMLImageElement>,
        mobile: {} as Record<string, HTMLImageElement>,
      }
      const sounds: Record<string, HTMLAudioElement> = {}

      for (const item of imageEntries) {
        images[item.key] = await item.loader()
        loaded++
        console.log(`Loaded ${item.key} (${loaded}/${total})`)
        setProgress(Math.round((loaded / total) * 100))
      }
      for (const item of desktopBgEntries) {
        backgrounds.desktop[item.key] = await item.loader()
        loaded++
        console.log(`Loaded ${item.key} (${loaded}/${total})`)
        setProgress(Math.round((loaded / total) * 100))
      }
      for (const item of mobileBgEntries) {
        backgrounds.mobile[item.key] = await item.loader()
        loaded++
        console.log(`Loaded ${item.key} (${loaded}/${total})`)
        setProgress(Math.round((loaded / total) * 100))
      }

      for (const item of soundEntries) {
        sounds[item.key] = await item.loader()
        loaded++
        console.log(`Loaded ${item.key} (${loaded}/${total})`)
        setProgress(Math.round((loaded / total) * 100))
      }

      setImages(images)
      setBackgrounds(backgrounds)
      setSounds(sounds)

      setLoading(false)
    }

    loadAll()
  }, [])

  // 조합된 아바타

  const [avatarCache, setAvatarCache] = useState<Record<string, string>>({})

  return (
    <AssetContext.Provider
      value={{
        images,
        backgrounds,
        sounds,
        loading,
        progress,
        avatarCache,
        setAvatarCache,
      }}
    >
      {children}
    </AssetContext.Provider>
  )
}
