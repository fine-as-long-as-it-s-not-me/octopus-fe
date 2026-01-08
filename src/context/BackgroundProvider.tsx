import { useState, type ReactNode } from 'react'

import { useAssets } from './AssetContext'
import { BackgroundContext } from './BackgroundContext'

type Props = { children: ReactNode }

export const BackgroundProvider = ({ children }: Props) => {
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null)

  const [playingMusicKey, setPlayingMusicKey] = useState<string | null>(null)
  const [playingMusic, setPlayingMusic] = useState<HTMLAudioElement | null>(
    null,
  )
  const [muteMusic, setMuteMusic] = useState(
    Boolean(localStorage.getItem('muteMusic')),
  )
  const [interacted, setInteracted] = useState(false)

  const { backgrounds, sounds } = useAssets()

  function playMusic(key: string) {
    if (!interacted) return
    if (muteMusic) return
    if (key === playingMusicKey) return

    if (playingMusic) {
      playingMusic.pause()
    }

    const music = sounds[key]

    if (music) {
      const musicClone = music.cloneNode() as HTMLAudioElement
      musicClone.loop = true
      musicClone.play()
      setPlayingMusic(musicClone)
      setPlayingMusicKey(key)
    }
  }

  function muteMusicToggle() {
    setMuteMusic(prev => {
      const newMuteState = !prev
      localStorage.setItem('muteMusic', newMuteState ? 'true' : '')
      if (newMuteState && playingMusic) {
        playingMusic.pause()
      } else if (!newMuteState && playingMusic) {
        playingMusic.play()
      }
      return newMuteState
    })
  }

  function setBackgroundImage(key: string) {
    const platform = window.innerWidth >= 768 ? 'desktop' : 'mobile'
    if (backgrounds[platform][key]) setBgImage(backgrounds[platform][key])
  }

  function LoadingScreen() {
    const { progress } = useAssets()
    return (
      <div
        className={`absolute flex items-center justify-center inset-0 bg-black flex-col text-white ${
          interacted && progress === 100 ? 'hidden' : 'flex'
        }`}
        onClick={() => setInteracted(true)}
      >
        <h2>Loading...</h2>
        <progress value={progress} max={100} />
        <p>{progress}%</p>
        {progress === 100 && <p>press anywhere to continue</p>}
      </div>
    )
  }

  return (
    <BackgroundContext.Provider
      value={{
        interacted,
        isMuted: muteMusic,
        setInteracted,
        playMusic,
        muteMusicToggle,
        setBackgroundImage,
      }}
    >
      <div
        className='flex flex-col width-full height-full items-center'
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
