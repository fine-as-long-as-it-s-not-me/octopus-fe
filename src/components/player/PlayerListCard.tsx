import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useWindow } from '@/context/WindowContext'
import { useRoomStore } from '@/store/roomStore'
import Card from '../common/Card'
import Icon from '../common/Icon'
import PlayerListItem from './PlayerListItem'

export default function PlayerListCard() {
  const { t } = useTranslation()
  const { players } = useRoomStore()
  const { direction } = useWindow()

  return (
    <Card
      size='md'
      className={twMerge(
        'items-center gap-4 sm:shrink-0 sm:flex-col sm:py-2 md:py-3',
        direction === 'vertical' ? 'hidden h-fit w-full' : 'flex h-full w-fit',
      )}
    >
      <div className={twMerge('flex items-center justify-center gap-2')}>
        <Icon name='group' />
        <p className='sm:inline'>
          {t('Players')} ({players.length})
        </p>
      </div>

      <div
        className={twMerge(
          'flex-col items-center gap-4 sm:flex',
          direction === 'vertical' ? 'flex-row' : 'flex-col',
        )}
      >
        {players.map(player => (
          <PlayerListItem key={player.UUID} {...player} />
        ))}
      </div>
    </Card>
  )
}
