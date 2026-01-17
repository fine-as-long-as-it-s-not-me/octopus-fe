import { useEffect, useState, type ReactNode } from 'react'

import { useAssets } from './AssetContext'
import { EffectsContext } from './EffectsContext'

export default function EffectProvider({ children }: { children: ReactNode }) {
  const [muteSoundEffects, setMuteSoundEffects] = useState(
    Boolean(localStorage.getItem('muteSoundEffects')),
  )

  const { loading, sounds } = useAssets()

  useEffect(() => {
    // 클릭 사운드 이펙트
    const clickSound = sounds['taek']
    if (clickSound) {
      const handleClick = () => {
        if (muteSoundEffects) return
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
    if (loading) return
    if (muteSoundEffects) return

    const sound = sounds[key]
    if (!sound) return

    const soundClone = sound.cloneNode() as HTMLAudioElement
    soundClone.play()
  }

  function muteSoundEffectToggle() {
    setMuteSoundEffects(prev => {
      const newMuteState = !prev
      localStorage.setItem('muteSoundEffects', newMuteState ? 'true' : '')
      return newMuteState
    })
  }

  return (
    <EffectsContext.Provider
      value={{
        isMuted: muteSoundEffects,
        playSoundEffect,
        muteSoundEffectToggle,
      }}
    >
      {children}
    </EffectsContext.Provider>
  )
}
