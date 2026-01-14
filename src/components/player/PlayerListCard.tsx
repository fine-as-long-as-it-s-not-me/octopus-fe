import { useTranslation } from 'react-i18next'
import { Spacing } from 'sam-react-modal'

import Card from '../common/Card'
import Icon from '../common/Icon'
import PlayerListItem from './PlayerListItem'

const players = [
  {
    name: 'Player 1',
    host: true,
    drawing: true,
    nextDrawer: false,
  },
  {
    name: 'Player 2',
    host: false,
    drawing: false,
    nextDrawer: false,
  },
  {
    name: 'Player 3',
    host: false,
    drawing: false,
    nextDrawer: true,
  },
]
export default function PlayerListCard() {
  const { t } = useTranslation()

  return (
    <Card
      size='md'
      className='flex w-fit items-center gap-4 sm:min-w-[320px] sm:grow-1 sm:flex-col sm:py-2 md:py-3'
    >
      <div className='flex flex-row items-center justify-center gap-2'>
        <Icon name='group' />
        <p className='hidden sm:inline'>
          {t('Players')} ({players.length})
        </p>
      </div>

      <div className='hidden w-full flex-col items-center gap-4 sm:flex'>
        {players.map(player => (
          <PlayerListItem key={player.name} {...player} />
        ))}
      </div>
    </Card>
  )
}
