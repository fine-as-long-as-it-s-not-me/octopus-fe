import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

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
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black text-white ${
          interacted && progress === 100 ? 'hidden' : 'flex'
        }`}
        onClick={() => setInteracted(true)}
        onKeyDown={() => setInteracted(true)}
      >
        <h2>{t('Loading')}...</h2>
        <div className='flex flex-col items-center'>
          <progress value={progress} max={100} />
          <p>{progress}%</p>
        </div>
        {progress === 100 && <p>{t('press anywhere to continue')}</p>}
      </div>
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
