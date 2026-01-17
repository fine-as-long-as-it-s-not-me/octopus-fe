import { twMerge } from 'tailwind-merge'

import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import Canvas from '@/components/game/Canvas'
import { useWindow } from '@/context/WindowContext'

export default function DiscussionPage() {
  const { direction } = useWindow()
  return (
    <div
      className={twMerge(
        'flex shrink-0 grow-1 flex-col sm:gap-2',
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
      <Button className='flex shrink-0'>
        <div className='flex'>
          <Icon name='timer' />
          <Icon name='add' size={16} />
        </div>
        More Time
      </Button>
      <Button className='flex shrink-0'>
        <div className='flex'>
          <Icon name='timer' />
          <Icon name='remove' size={16} />
        </div>
        Less Time
      </Button>
    </div>
  )
}
