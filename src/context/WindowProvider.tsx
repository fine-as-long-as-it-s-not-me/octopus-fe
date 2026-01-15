import { useEffect, useRef, useState } from 'react'

import { WindowContext, type ScreenSize } from './WindowContext'

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
  const ref = useRef(new Date().getTime())

  useEffect(() => {
    const handleResize = () => {
      if (new Date().getTime() - ref.current < 100) return
      ref.current = new Date().getTime()
      setSize({
        sm: window.innerWidth >= 640,
        md: window.innerWidth >= 768,
        lg: window.innerWidth >= 1024,
      })
      setDirection(
        window.innerWidth >= window.innerHeight ? 'horizontal' : 'vertical',
      )
    }

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
