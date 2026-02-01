import { useState, type ReactNode } from 'react'

import LoadingScreen from '@/components/common/LoadingScreen'
import { useAssets } from './AssetContext'
import { BackgroundContext } from './BackgroundContext'

type Props = { children: ReactNode }

export const BackgroundProvider = ({ children }: Props) => {
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null)
  const [interacted, setInteracted] = useState(false)
  const { backgrounds } = useAssets()

  function setBackgroundImage(key: string) {
    const platform = window.innerWidth >= 768 ? 'desktop' : 'mobile'
    if (backgrounds[platform][key]) setBgImage(backgrounds[platform][key])
  }

  return (
    <BackgroundContext.Provider
      value={{
        interacted,
        setInteracted,
        setBackgroundImage,
      }}
    >
      <div
        className='flex h-dvh w-dvw flex-col items-center justify-center'
        style={{
          backgroundImage: bgImage ? `url(${bgImage.src})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
      <LoadingScreen />
    </BackgroundContext.Provider>
  )
}
