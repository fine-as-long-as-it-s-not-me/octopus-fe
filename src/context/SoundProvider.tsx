import { useEffect, useState, type ReactNode } from 'react'

import { useAssets } from './AssetContext'
import { useBackground } from './BackgroundContext'
import { SoundContext } from './SoundContext'

export default function SoundProvider({ children }: { children: ReactNode }) {
  const [isEffectMuted, setIsEffectMuted] = useState(
    Boolean(localStorage.getItem('isEffectMuted')),
  )
  const [isMusicMuted, setIsMusicMuted] = useState(
    Boolean(localStorage.getItem('isMusicMuted')),
  )
  const [playingMusicKey, setPlayingMusicKey] = useState<string | null>(null)
  const [playingMusic, setPlayingMusic] = useState<HTMLAudioElement | null>(
    null,
  )
  const { sounds } = useAssets()
  const { interacted } = useBackground()

  function playMusic(key: string) {
    if (!interacted) return
    if (isMusicMuted) return
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

  function pauseMusic() {
    if (playingMusic) {
      playingMusic.pause()
      setPlayingMusicKey(null)
      setPlayingMusic(null)
    }
  }

  function muteMusicToggle() {
    setIsMusicMuted(prev => {
      const newMuteState = !prev
      localStorage.setItem('isMusicMuted', newMuteState ? 'true' : '')
      if (newMuteState && playingMusic) {
        playingMusic.pause()
      } else if (!newMuteState && playingMusic) {
        playingMusic.play()
      }
      return newMuteState
    })
  }

  useEffect(() => {
    // 클릭 사운드 이펙트
    const clickSound = sounds['taek']
    if (clickSound) {
      const handleClick = () => {
        if (isEffectMuted) return
        const soundClone = clickSound.cloneNode() as HTMLAudioElement
        soundClone.play()
      }
      window.addEventListener('click', handleClick)
      return () => {
        window.removeEventListener('click', handleClick)
      }
    }
  })

  function playSoundEffect(key: string) {
    if (!interacted) return
    if (isEffectMuted) return

    const sound = sounds[key]
    if (!sound) return

    const soundClone = sound.cloneNode() as HTMLAudioElement
    soundClone.play()
  }

  function muteSoundEffectToggle() {
    setIsEffectMuted(prev => {
      const newMuteState = !prev
      localStorage.setItem('isEffectMuted', newMuteState ? 'true' : '')
      return newMuteState
    })
  }

  return (
    <SoundContext.Provider
      value={{
        isEffectMuted,
        isMusicMuted,
        playMusic,
        pauseMusic,
        muteMusicToggle,
        playSoundEffect,
        muteSoundEffectToggle,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}
