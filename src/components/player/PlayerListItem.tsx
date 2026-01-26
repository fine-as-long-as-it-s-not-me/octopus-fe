import { twMerge } from 'tailwind-merge'

import { useWindow } from '@/context/WindowContext'
import { useGameStore } from '@/store/gameStore'
import Card from '../common/Card'
import Icon from '../common/Icon'
import Profile from './Profile'

interface Props {
  UUID: string
  name: string
  host?: boolean
}

export default function PlayerListItem({ UUID, name, host }: Props) {
  const { painterUUID, nextPainterUUID } = useGameStore()
  const { direction } = useWindow()

  return (
    <div
      className={twMerge(
        `m-[-2px] flex shrink-0 items-center`,
        direction === 'vertical' ? 'w-fit' : 'w-full',
      )}
    >
      <Card
        size='sm'
        className='flex w-full shrink-0 items-center justify-between gap-2 py-0 pr-2 md:pr-4'
      >
        <Profile name={name} />
        <Card
          size='sm'
          className='items-center gap-2 border-none bg-transparent'
        >
          {painterUUID === UUID ? (
            <Icon name='edit' />
          ) : nextPainterUUID === UUID ? (
            <p>next</p>
          ) : (
            host && <Icon name='crown' />
          )}
        </Card>
      </Card>
    </div>
  )
}
