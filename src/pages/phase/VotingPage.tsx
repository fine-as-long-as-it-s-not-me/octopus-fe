import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { useVoteOctopus } from '@/apis/game'
import Card from '@/components/common/Card'
import Canvas from '@/components/game/Canvas'
import VoteCard from '@/components/game/VoteCard'
import { useSound } from '@/context/SoundContext'
import { useWindow } from '@/context/WindowContext'

export default function VotingPage() {
  const { direction } = useWindow()
  const { mutate: vote } = useVoteOctopus()
  const { playSoundEffect } = useSound()

  useEffect(() => {
    playSoundEffect('nav')
  }, [playSoundEffect])

  return (
    <div className={twMerge('flex shrink-0 grow-12 flex-col sm:gap-2')}>
      <Card
        className={twMerge(
          'grow flex-col items-center justify-center gap-4',
          direction === 'vertical' ? '' : '',
        )}
      >
        <Canvas />
        <VoteCard
          onSubmit={(targetUUID: string) => vote({ targetUUID })}
          key={'voting'}
        />
      </Card>
    </div>
  )
}
