import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

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
  const playingMusicKey = useRef<string>(null)
  const playingMusic = useRef<HTMLAudioElement>(null)

  const [musicVolume, setMusicVolume] = useState(0.5)
  const [effectVolume, setEffectVolume] = useState(0.5)

  useEffect(() => {
    if (playingMusic.current) {
      playingMusic.current.volume = musicVolume
    }
  }, [musicVolume, playingMusic])

  const { sounds } = useAssets()
  const { interacted } = useBackground()

  function playMusic(key: string) {
    if (!interacted) return
    if (isMusicMuted) return
    if (key === playingMusicKey.current) return

    if (playingMusic.current) {
      playingMusic.current.pause()
    }

    const music = sounds[key]

    if (music) {
      const musicClone = music.cloneNode() as HTMLAudioElement
      musicClone.loop = true
      musicClone.volume = musicVolume
      musicClone.play()
      playingMusic.current = musicClone
      playingMusicKey.current = key
    }
  }

  function pauseMusic() {
    if (playingMusic.current) {
      playingMusic.current.pause()
      playingMusicKey.current = null
      playingMusic.current = null
    }
  }

  function muteMusicToggle() {
    setIsMusicMuted(prev => {
      const newMuteState = !prev
      localStorage.setItem('isMusicMuted', newMuteState ? 'true' : '')
      if (newMuteState && playingMusic.current) {
        playingMusic.current.pause()
      } else if (!newMuteState && playingMusic.current) {
        playingMusic.current.play()
      }
      return newMuteState
    })
  }

  const playSoundEffect = useCallback(
    (key: string) => {
      if (!interacted) return
      if (isEffectMuted) return

      const sound = sounds[key]
      if (!sound) return

      const soundClone = sound.cloneNode() as HTMLAudioElement
      soundClone.volume = effectVolume
      soundClone.play()
    },
    [interacted, isEffectMuted, sounds, effectVolume],
  )

  function muteSoundEffectToggle() {
    setIsEffectMuted(prev => {
      const newMuteState = !prev
      localStorage.setItem('isEffectMuted', newMuteState ? 'true' : '')
      return newMuteState
    })
  }

  useEffect(() => {
    // 클릭 사운드 이펙트
    const clickSound = sounds['taek']
    if (clickSound) {
      const handleClick = () => {
        playSoundEffect('taek')
      }
      window.addEventListener('click', handleClick)
      return () => {
        window.removeEventListener('click', handleClick)
      }
    }
  }, [sounds, interacted, isEffectMuted, playSoundEffect])

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
        setMusicVolume,
        setEffectVolume,
        musicVolume,
        effectVolume,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}
