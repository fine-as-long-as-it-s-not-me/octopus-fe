import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { useVoteOctopus } from '@/apis/game'
import Card from '@/components/common/Card'
import Canvas from '@/components/game/Canvas'
import CanvasOpenButton from '@/components/game/CanvasOpenButton'
import VoteCard from '@/components/game/VoteCard'
import { useSound } from '@/context/SoundContext'
import { useWindow } from '@/context/WindowContext'
import { useRoundStore } from '@/store/roundStore'

export default function VotingPage() {
  const { direction } = useWindow()
  const { mutate: vote } = useVoteOctopus()
  const { playSoundEffect } = useSound()
  const { revoting } = useRoundStore()

  useEffect(() => {
    playSoundEffect('nav')
  }, [playSoundEffect])

  console.log(revoting.toString())

  return (
    <div className={twMerge('flex grow-1 flex-col sm:gap-2')}>
      {direction === 'vertical' && <CanvasOpenButton />}
      <Card
        className={twMerge('grow flex-col items-center justify-center gap-4')}
      >
        {direction !== 'vertical' && <Canvas />}
        <VoteCard
          key={revoting.toString()}
          onSubmit={(targetUUID: string) => vote({ targetUUID })}
        />
      </Card>
    </div>
  )
}
