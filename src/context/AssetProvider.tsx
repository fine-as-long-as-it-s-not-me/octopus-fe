import { useEffect, useState, type ReactNode } from 'react'

import {
  avatarAssets,
  desktopBgAssets,
  mobileBgAssets,
  musicAssets,
  soundEffectsAssets,
} from '@/assets'
import { buildEntries, loadAudio, loadGroup, loadImage } from '@/lib/loaders'
import { AssetContext } from './AssetContext'

type Props = { children: ReactNode }

type BackgroundAssets = {
  desktop: Record<string, HTMLImageElement>
  mobile: Record<string, HTMLImageElement>
}

export const AssetProvider = ({ children }: Props) => {
  const [images, setImages] = useState<Record<string, HTMLImageElement>>({})
  const [backgrounds, setBackgrounds] = useState<BackgroundAssets>({
    desktop: {},
    mobile: {},
  })
  const [sounds, setSounds] = useState<Record<string, HTMLAudioElement>>({})
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [avatarCache, setAvatarCache] = useState<Record<string, string>>({})

  const [interacted, setInteracted] = useState(false)

  useEffect(() => {
    if (interacted) {
      document.onclick = null
      document.ontouchstart = null
    } else {
      document.onclick = () => {
        setInteracted(true)
      }
      document.ontouchstart = () => {
        setInteracted(true)
      }
    }
    return () => {
      document.onclick = null
      document.ontouchstart = null
    }
  }, [interacted])

  useEffect(() => {
    let cancelled = false

    const imageEntries = buildEntries(avatarAssets, loadImage)
    const desktopEntries = buildEntries(desktopBgAssets, loadImage)
    const mobileEntries = buildEntries(mobileBgAssets, loadImage)

    const total =
      imageEntries.length + desktopEntries.length + mobileEntries.length

    let loaded = 0

    const onItemLoaded = () => {
      loaded++
      if (!cancelled) setProgress(Math.round((loaded / total) * 100))
    }

    Promise.all([
      loadGroup(imageEntries, onItemLoaded),
      loadGroup(desktopEntries, onItemLoaded),
      loadGroup(mobileEntries, onItemLoaded),
    ]).then(([imagesRes, desktopRes, mobileRes]) => {
      if (cancelled) return

      setImages(imagesRes)
      setBackgrounds({
        desktop: desktopRes,
        mobile: mobileRes,
      })
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!interacted) return

    let cancelled = false

    const soundEntries = [
      ...buildEntries(soundEffectsAssets, loadAudio),
      ...buildEntries(musicAssets, loadAudio),
    ]

    loadGroup(soundEntries).then(soundsRes => {
      if (cancelled) return

      setSounds(soundsRes)
    })

    return () => {
      cancelled = true
    }
  }, [interacted])

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
        interacted,
      }}
    >
      {children}
    </AssetContext.Provider>
  )
}
