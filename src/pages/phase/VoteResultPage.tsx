import { useEffect, useRef } from 'react'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'

import Card from '@/components/common/Card'
import Img from '@/components/common/Img'
import VoteCard from '@/components/game/VoteCard'
import { CONFETTI_DELAY } from '@/consts'
import useAvatar from '@/hooks/useAvatar'

export default function VoteResultPage() {
  const avatar = useAvatar('abc')
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!imageRef.current) return
    const timeout = setTimeout(() => {
      if (imageRef.current) imageRef.current.style.filter = 'none'
    }, CONFETTI_DELAY)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Card className='flex h-fit w-auto shrink-0 grow-4 flex-col items-center justify-center'>
      <Img
        src={avatar}
        ref={imageRef}
        style={{
          transition: 'filter 0.5s ease-in-out',
        }}
        className='mb-4 max-w-[160px] grayscale filter-[brightness(0)]'
      />

      <Realistic
        autorun={{ speed: 0.0001, delay: CONFETTI_DELAY }}
        decorateOptions={() => ({
          angle: 90,
          origin: { x: 0.5, y: 0.4 },
        })}
      />
      <VoteCard key={'result'} />
    </Card>
  )
}
