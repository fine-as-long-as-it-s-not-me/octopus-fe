import { twMerge } from 'tailwind-merge'

import Card from '@/components/common/Card'
import Canvas from '@/components/game/Canvas'
import { useWindow } from '@/context/WindowContext'

export default function VotingPage() {
  const { direction } = useWindow()
  return (
    <div
      className={twMerge(
        'flex shrink-0 grow-12 flex-col sm:gap-2',
        direction === 'vertical' ? '' : '',
      )}
    >
      <Card
        className={twMerge(
          'flex min-w-[480px] grow items-center justify-center',
          direction === 'vertical' ? '' : '',
        )}
      >
        <Canvas />
      </Card>
    </div>
  )
}
