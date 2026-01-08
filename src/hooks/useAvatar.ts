import { useState } from "react"
import { useAssets } from "../context/AssetContext"
import { IMAGE } from "../consts"


export default function useAvatar (name: string): string {
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const { images, loading, avatarCache, setAvatarCache } = useAssets()

  const skinIndex = hashNameToSkinIndex(name)
  const accessoryIndex = hashNameToAccessoryIndex(name)
  const cacheKey = `${skinIndex}-${accessoryIndex}`

  const skinImage = images[`skin${skinIndex.toString().padStart(2, '0')}`] as HTMLImageElement
  const accessoryImage = images[`accessory${accessoryIndex.toString().padStart(2, '0')}`] as HTMLImageElement

  if (loading) return ''

  if (avatarCache[cacheKey]) {
    console.log('cache hit')
  } else {
    console.log('cache miss')

    const canvas = document.createElement('canvas')
    canvas.width = IMAGE.AVATAR_SQUARE_SIZE
    canvas.height = IMAGE.AVATAR_SQUARE_SIZE
    const ctx = canvas.getContext('2d')

    ctx?.drawImage(skinImage, 0, 0, IMAGE.AVATAR_SQUARE_SIZE, IMAGE.AVATAR_SQUARE_SIZE)
    ctx?.drawImage(accessoryImage, 0, 0, IMAGE.AVATAR_SQUARE_SIZE, IMAGE.AVATAR_SQUARE_SIZE)
    setAvatarCache({
      ...avatarCache,
      [cacheKey]: canvas.toDataURL()
    })
  }

  if (avatarUrl !== avatarCache[cacheKey])
    setAvatarUrl(avatarCache[cacheKey])

  return avatarUrl
}

function hashNameToSkinIndex (name: string): number {
  return name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 36
}

function hashNameToAccessoryIndex (name: string): number {
  return name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0) * 7, 0) % 31
}