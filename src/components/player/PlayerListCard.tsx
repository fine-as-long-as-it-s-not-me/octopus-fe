import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useRoom } from '@/context/RoomContext'
import { useWindow } from '@/context/WindowContext'
import Card from '../common/Card'
import Icon from '../common/Icon'
import PlayerListItem from './PlayerListItem'

export default function PlayerListCard() {
  const { t } = useTranslation()
  const { players } = useRoom()
  const { direction } = useWindow()

  return (
    <Card
      size='md'
      className={twMerge(
        'hidden items-center gap-4 sm:flex sm:shrink-0 sm:flex-col sm:py-2 md:py-3',
        direction === 'vertical' ? 'h-fit w-full' : 'h-full w-fit',
      )}
    >
      <div className={twMerge('flex items-center justify-center gap-2')}>
        <Icon name='group' />
        <p className='hidden sm:inline'>
          {t('Players')} ({players.length})
        </p>
      </div>

      <div
        className={twMerge(
          'hidden flex-col items-center gap-4 sm:flex',
          direction === 'vertical' ? 'flex-row' : 'flex-col',
        )}
      >
        {players.map(player => (
          <PlayerListItem key={player.name} {...player} />
        ))}
      </div>
    </Card>
  )
}
