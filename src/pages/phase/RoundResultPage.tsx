import { twMerge } from 'tailwind-merge'

import Card from '@/components/common/Card'
import { useWindow } from '@/context/WindowContext'
import { useGameStore } from '@/store/gameStore'

export default function RoundResultPage() {
  const { scores } = useGameStore()
  const { direction } = useWindow()
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
          {scores.map((score, index) => (
            <tr key={score.player.UUID}>
              <td className='w-6'>{index + 1}</td>
              <td className='w-32'>{score.player.name}</td>
              <td className='w-10'>{score.delta}</td>
              <td className='w-20'>{score.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
