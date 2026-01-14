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
    <Card className='flex w-fit min-w-[320px] grow-1 flex-col gap-2 p-4 md:p-6'>
      <div className='flex flex-row items-center justify-center gap-2'>
        <Icon name='group' />
        <p>
          {t('Players')} ({players.length})
        </p>
      </div>
      <Spacing />
      <div className='flex flex-col items-start gap-4'>
        {players.map(player => (
          <PlayerListItem key={player.name} {...player} />
        ))}
      </div>
    </Card>
  )
}
