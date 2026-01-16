import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

import { WindowContext, type ScreenSize } from './WindowContext'

const RESIZE_THROTTLE_MS = 500

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
  const [isCompact, setIsCompact] = useState<boolean>(false)
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>(
    window.innerWidth >= window.innerHeight ? 'horizontal' : 'vertical',
  )

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({
        sm: window.innerWidth >= 640,
        md: window.innerWidth >= 768,
        lg: window.innerWidth >= 1024,
      })
      const newD =
        window.innerWidth >= window.innerHeight - 100
          ? 'horizontal'
          : 'vertical'
      setDirection(newD)
    }, RESIZE_THROTTLE_MS)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <WindowContext.Provider
      value={{ size, direction, isCompact, setIsCompact }}
    >
      {children}
    </WindowContext.Provider>
  )
}
