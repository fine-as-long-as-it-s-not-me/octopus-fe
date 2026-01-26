import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import Canvas from '@/components/game/Canvas'
import Pallette from '@/components/game/Pallette'
import { useSound } from '@/context/SoundContext'
import { useWindow } from '@/context/WindowContext'
import { useGameStore } from '@/store/gameStore'
import { useUserStore } from '@/store/userStore'

export default function DrawingPage() {
  const { direction } = useWindow()
  const { painterUUID } = useGameStore()
  const { UUID } = useUserStore()
  const { playMusic } = useSound()

  useEffect(() => {
    if (UUID === painterUUID) playMusic('drawing')
    else playMusic('kidsgame')
  }, [painterUUID, UUID, playMusic])

  return (
    <div
      className={twMerge(
        'flex shrink-0 grow-12 flex-col overflow-hidden sm:gap-2',
        direction === 'vertical' ? '' : '',
      )}
    >
      <Canvas />
      <Pallette />
    </div>
  )
}
