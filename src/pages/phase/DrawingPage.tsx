import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import Canvas from '@/components/game/Canvas'
import Palette from '@/components/game/Palette'
import { useSound } from '@/context/SoundContext'
import { useWindow } from '@/context/WindowContext'
import { useRoundStore } from '@/store/roundStore'
import { useUserStore } from '@/store/userStore'

export default function DrawingPage() {
  const { direction } = useWindow()
  const { painterUUID } = useRoundStore()
  const { UUID } = useUserStore()
  const { playMusic } = useSound()

  // const isDrawing = true
  const isDrawing = UUID === painterUUID

  useEffect(() => {
    if (isDrawing) playMusic('drawing')
    else playMusic('kidsgame')
  }, [isDrawing, playMusic])

  return (
    <div
      className={twMerge(
        'flex flex-col items-center overflow-hidden sm:gap-2',
        direction === 'vertical' ? 'sm:max-h-[60vh]' : 'grow-1',
      )}
    >
      <Canvas />
      {isDrawing && <Palette />}
    </div>
  )
}
