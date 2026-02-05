import type { LoaderEntry } from '@/types'

export const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = reject
  })

export const loadAudio = (src: string): Promise<HTMLAudioElement> =>
  new Promise((resolve, reject) => {
    const audio = new Audio(src)
    audio.oncanplaythrough = () => resolve(audio)
    audio.onerror = reject
  })

export const loadJSON = async (src: string) => {
  const res = await fetch(src)
  if (!res.ok) throw new Error(`Failed to load ${src}`)
  return res.json()
}

export const loadGroup = async <T>(
  entries: LoaderEntry<T>[],
  onItemLoaded?: () => void,
): Promise<Record<string, T>> => {
  const result: Record<string, T> = {}

  await Promise.all(
    entries.map(async entry => {
      try {
        const asset = await entry.loader()
        result[entry.key] = asset
      } catch (e) {
        console.error(`Failed to load asset: ${entry.key}`, e)
      } finally {
        onItemLoaded?.()
      }
    }),
  )

  return result
}

export const buildEntries = <T>(
  assets: Record<string, string>,
  loaderFn: (src: string) => Promise<T>,
): LoaderEntry<T>[] =>
  Object.entries(assets).map(([key, src]) => ({
    key,
    loader: () => loaderFn(src),
  }))
