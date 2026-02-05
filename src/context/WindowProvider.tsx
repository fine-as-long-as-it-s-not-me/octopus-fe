import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

import { useAssets } from './AssetContext'
import { WindowContext, type ScreenSize } from './WindowContext'

const RESIZE_THROTTLE_MS = 300

export default function WindowProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [size, setSize] = useState<ScreenSize>({
    sm: window.innerWidth >= 640,
    md: window.innerWidth >= 768,
    lg: window.innerWidth >= 1024,
  })
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [isCompact, setIsCompact] = useState<boolean>(false)
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>(
    window.innerWidth >= window.innerHeight ? 'horizontal' : 'vertical',
  )
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({
        sm: window.innerWidth >= 640,
        md: window.innerWidth >= 768,
        lg: window.innerWidth >= 1024,
      })
      const newD =
        window.innerWidth >= window.innerHeight ? 'horizontal' : 'vertical'
      setDirection(newD)
    }, RESIZE_THROTTLE_MS)

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false)
      } else {
        setIsFullscreen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const fullscreenToggle = (onError?: () => void) => {
    if (!document.fullscreenElement) {
      try {
        screenRef.current?.requestFullscreen()
      } catch {
        onError?.()
      }
    } else {
      try {
        document.exitFullscreen()
      } catch {
        onError?.()
      }
    }
  }

  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null)
  const { backgrounds } = useAssets()

  function setBackgroundImage(key: string) {
    const platform = window.innerWidth >= 768 ? 'desktop' : 'mobile'
    if (backgrounds[platform][key]) setBgImage(backgrounds[platform][key])
  }

  return (
    <WindowContext.Provider
      value={{
        size,
        direction,
        isCompact,
        setIsCompact,
        isFullscreen,
        fullscreenToggle,
        setBackgroundImage,
      }}
    >
      <div
        className='flex h-lvh w-lvw flex-col items-center justify-center overflow-hidden'
        style={{
          backgroundImage: bgImage ? `url(${bgImage.src})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        ref={screenRef}
      >
        {children}
      </div>
    </WindowContext.Provider>
  )
}
