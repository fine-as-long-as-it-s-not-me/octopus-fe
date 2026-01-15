import { twMerge } from 'tailwind-merge'

import Card from '@/components/common/Card'
import { useWindow } from '@/context/WindowContext'

export default function DrawingPage() {
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
          'flex aspect-square min-w-[480px] items-center justify-center',
          direction === 'vertical' ? '' : '',
        )}
      >
        <div className='block aspect-square w-full bg-black'>canvas</div>
      </Card>
      <Card className='flex shrink-0'>palette</Card>
    </div>
  )
}
