import { useTranslation } from 'react-i18next'

import { useRoom } from '@/context/RoomContext'
import Card from '../common/Card'
import Icon from '../common/Icon'
import PlayerListItem from './PlayerListItem'

export default function PlayerListCard() {
  const { t } = useTranslation()
  const { players } = useRoom()

  return (
    <Card
      size='md'
      className='hidden h-full w-fit items-center gap-4 sm:flex sm:shrink-0 sm:flex-col sm:py-2 md:py-3'
    >
      <div className='flex flex-row items-center justify-center gap-2'>
        <Icon name='group' />
        <p className='hidden sm:inline'>
          {t('Players')} ({players.length})
        </p>
      </div>

      <div className='hidden flex-col items-center gap-4 sm:flex'>
        {players.map(player => (
          <PlayerListItem key={player.name} {...player} />
        ))}
      </div>
    </Card>
  )
}
