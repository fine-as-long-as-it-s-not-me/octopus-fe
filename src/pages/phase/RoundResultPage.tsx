import { useEffect } from 'react'
import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import Card from '@/components/common/Card'
import { useWindow } from '@/context/WindowContext'
import { useGameStore } from '@/store/gameStore'
import { useRoundStore } from '@/store/roundStore'
import { Phase } from '@/types'

export default function RoundResultPage() {
  const { direction } = useWindow()
  const { openModal } = useModal()

  const { ranks } = useGameStore()
  const { phase } = useRoundStore()

  useEffect(() => {
    if (phase === Phase.GAME_RESULT) {
      openModal(<Card>Game Result Modal</Card>)
    }
  }, [phase, openModal])
  return (
    <Card
      className={twMerge(
        'shrink-0 grow-4 flex-col gap-2',
        direction === 'vertical' ? 'w-full' : 'w-fit',
      )}
    >
      <h1 className='w-full text-center'>Result</h1>
      <table className='border-separate border-spacing-y-8 text-center'>
        <thead>
          <tr>
            <th className='w-6'>Ranking</th>
            <th className='w-32'>Player</th>
            <th className='w-10'>Delta</th>
            <th className='w-20'>Total</th>
          </tr>
        </thead>
        <tbody>
          {ranks.map((rank, index) => (
            <tr key={rank.player.UUID}>
              <td className='w-6'>{index + 1}</td>
              <td className='w-32'>{rank.player.name}</td>
              <td className='w-10'>{rank.score.delta}</td>
              <td className='w-20'>{rank.score.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
