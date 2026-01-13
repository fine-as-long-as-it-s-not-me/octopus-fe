import { useTranslation } from 'react-i18next'
import { Spacing } from 'sam-react-modal'

import Card from '../common/Card'
import Icon from '../common/Icon'
import Profile from './Profile'

const players = [
  'Player 1',
  'Player 2',
  'Player 3',
  'Player 4',
  'Player 5',
  'Player 6',
  'Player 7',
  'Player 8',
]
export default function PlayersCard() {
  const { t } = useTranslation()

  return (
    <Card className='flex w-fit grow-1 flex-col gap-2'>
      <div className='flex flex-row items-center justify-center gap-2'>
        <Icon name='group' />
        <p>
          {t('Players')} ({players.length})
        </p>
      </div>
      <Spacing />
      <div className='flex flex-col items-start gap-6'>
        {players.map(player => (
          <Profile key={player} name={player} />
        ))}
      </div>
    </Card>
  )
}
