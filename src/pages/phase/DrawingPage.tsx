import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import Card from '@/components/common/Card'
import Canvas from '@/components/game/Canvas'
import { useBackground } from '@/context/BackgroundContext'
import { useRoom } from '@/context/RoomContext'
import { useUser } from '@/context/UserContext'
import { useWindow } from '@/context/WindowContext'

export default function DrawingPage() {
  const { direction } = useWindow()
  const { players } = useRoom()
  const { id } = useUser()
  const { playMusic } = useBackground()

  useEffect(() => {
    const me = players.find(p => p.id === id)
    if (me && me.drawing) playMusic('drawing')
    else playMusic('kidsgame')
  })

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
