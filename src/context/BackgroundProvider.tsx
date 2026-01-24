import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

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

  function LoadingScreen() {
    const { progress } = useAssets()
    const { t } = useTranslation()
    return (
      <button
        className={twMerge(
          `absolute inset-0 flex flex-col items-center justify-center gap-6 text-white`,
          interacted && progress === 100 ? 'hidden' : 'flex',
        )}
        style={{
          background: 'linear-gradient(rgb(82, 165, 255), rgb(5, 47, 118))',
        }}
        onClick={() => setInteracted(true)}
        onKeyDown={() => setInteracted(true)}
        tabIndex={0}
      >
        {progress === 100 ? (
          <p>{t('press anywhere to continue')}</p>
        ) : (
          <h2>{t('Loading')}...</h2>
        )}

        <div className='relative flex flex-col items-center'>
          <div className='water-round-container'>
            <div
              className='water-wave1'
              style={{ top: `${100 - progress}%` }}
            ></div>
            <div
              className='water-wave2'
              style={{ top: `${105 - progress}%` }}
            ></div>
            <div
              className='water-wave3'
              style={{ top: `${110 - progress}%` }}
            ></div>
            <p className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-lg font-bold'>
              {progress}%
            </p>
          </div>
          {/* <progress value={progress} max={100} /> */}
        </div>
      </button>
    )
  }

  return (
    <BackgroundContext.Provider
      value={{
        interacted,
        setBackgroundImage,
      }}
    >
      <div
        className='width-full height-full flex flex-col items-center'
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
