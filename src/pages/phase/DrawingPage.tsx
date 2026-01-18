import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import Card from '@/components/common/Card'
import Canvas from '@/components/game/Canvas'
import { useRoom } from '@/context/RoomContext'
import { useSound } from '@/context/SoundContext'
import { useUser } from '@/context/UserContext'
import { useWindow } from '@/context/WindowContext'

export default function DrawingPage() {
  const { direction } = useWindow()
  const { players } = useRoom()
  const { id } = useUser()
  const { playMusic } = useSound()

  useEffect(() => {
    const me = players.find(p => p.id === id)
    if (me && me.drawing) playMusic('drawing')
    else playMusic('kidsgame')
  }, [players, id, playMusic])

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
