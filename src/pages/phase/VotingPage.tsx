import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useVoteOctopus } from '@/apis/game'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Canvas from '@/components/game/Canvas'
import Profile from '@/components/player/Profile'
import { useWindow } from '@/context/WindowContext'
import { useGameStore } from '@/store/gameStore'
import { useRoomStore } from '@/store/roomStore'

export default function VotingPage() {
  const { direction } = useWindow()
  const [selected, setSelected] = useState<string | null>(null)
  const [voted, setVoted] = useState<boolean>(false)
  const { players } = useRoomStore()
  const { mutate: vote } = useVoteOctopus()
  const { timeLeft } = useGameStore()

  useEffect(() => {
    if (timeLeft == 0 && !voted && selected) vote(selected)
  }, [timeLeft, voted, selected, vote])

  return (
    <div className={twMerge('flex shrink-0 grow-12 flex-col sm:gap-2')}>
      <Card
        className={twMerge(
          'min-w-[480px] grow flex-col items-center justify-center gap-4',
          direction === 'vertical' ? '' : '',
        )}
      >
        <Canvas />
        <div className='flex w-full flex-col gap-4'>
          <div className='grid grid-cols-6 gap-2'>
            {players.map(player => (
              <Button
                key={player.UUID}
                size='sm'
                cardClassName={twMerge(
                  voted ? '' : 'hover:bg-red-100',
                  selected === player.UUID ? 'border-4 border-red-400' : '',
                )}
                onClick={() => {
                  if (selected === player.UUID) setSelected(null)
                  else setSelected(player.UUID)
                }}
                disabled={voted}
              >
                <Profile name={player.name} size='sm' />
              </Button>
            ))}
          </div>
          <Button
            cardClassName={twMerge(
              'rounded-xl bg-gray-600 text-white',
              !voted ? 'hover:bg-gray-700' : '',
              !selected ? 'cursor-not-allowed opacity-50' : '',
            )}
            onClick={() => {
              if (selected) {
                vote(selected)
                setVoted(true)
              }
            }}
            disabled={!selected || voted}
          >
            {voted
              ? `Voted for ${players.find(player => player.UUID === selected)?.name}`
              : 'Vote'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
