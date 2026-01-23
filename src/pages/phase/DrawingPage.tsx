import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import Card from '@/components/common/Card'
import Canvas from '@/components/game/Canvas'
import { useSound } from '@/context/SoundContext'
import { useWindow } from '@/context/WindowContext'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'

export default function DrawingPage() {
  const { direction } = useWindow()
  const { players } = useRoomStore()
  const { UUID } = useUserStore()
  const { playMusic } = useSound()

  useEffect(() => {
    const me = players.find(p => p.UUID === UUID)
    if (me && me.drawing) playMusic('drawing')
    else playMusic('kidsgame')
  }, [players, UUID, playMusic])

  return (
    <div
      className={twMerge(
        'flex shrink-0 grow-12 flex-col sm:gap-2',
        direction === 'vertical' ? '' : '',
      )}
    >
      <Canvas />
      <Card className='flex shrink-0'>palette</Card>
    </div>
  )
}
