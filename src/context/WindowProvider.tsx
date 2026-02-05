import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

import LoadingScreen from '@/components/common/LoadingScreen'
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
  const [interacted, setInteracted] = useState(false)
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
        interacted,
        setInteracted,
        setBackgroundImage,
      }}
    >
      <>
        <div
          className='flex h-[100lvh] w-[100lvw] flex-col items-center justify-center overflow-visible'
          style={{
            backgroundImage: bgImage ? `url(${bgImage.src})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
          }}
          ref={screenRef}
        >
          {children}
        </div>
        <LoadingScreen />
      </>
    </WindowContext.Provider>
  )
}
