import { useState } from 'react'

import { useAssets } from '../context/AssetContext'

const AVATAR_SQUARE_SIZE = 640

export default function useAvatar(name: string): string {
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const { images, loading, avatarCache, setAvatarCache } = useAssets()

  const skinIndex = hashNameToSkinIndex(name)
  const accessoryIndex = hashNameToAccessoryIndex(name)
  const cacheKey = `${skinIndex}-${accessoryIndex}`

  const skinImage = images[
    `skin${skinIndex.toString().padStart(2, '0')}`
  ] as HTMLImageElement
  const accessoryImage = images[
    `accessory${accessoryIndex.toString().padStart(2, '0')}`
  ] as HTMLImageElement

  if (loading) return ''

  if (!avatarCache[cacheKey]) {
    const canvas = document.createElement('canvas')
    canvas.width = AVATAR_SQUARE_SIZE
    canvas.height = AVATAR_SQUARE_SIZE
    const ctx = canvas.getContext('2d')

    ctx?.drawImage(skinImage, 0, 0, AVATAR_SQUARE_SIZE, AVATAR_SQUARE_SIZE)
    ctx?.drawImage(accessoryImage, 0, 0, AVATAR_SQUARE_SIZE, AVATAR_SQUARE_SIZE)
    setAvatarCache({
      ...avatarCache,
      [cacheKey]: canvas.toDataURL(),
    })
  }

  if (avatarUrl !== avatarCache[cacheKey]) setAvatarUrl(avatarCache[cacheKey])

  return avatarUrl
}

function hashNameToSkinIndex(name: string): number {
  return name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 36
}

function hashNameToAccessoryIndex(name: string): number {
  return (
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0) * 7, 0) % 31
  )
}
