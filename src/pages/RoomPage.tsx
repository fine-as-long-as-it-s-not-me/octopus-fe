import { useTranslation } from 'react-i18next'
import { Spacing } from 'sam-react-modal'

import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import SettingItem from '@/components/game/SettingItem'
import Profile from '@/components/player/Profile'

export default function RoomPage() {
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
  const settings = [
    { label: 'Rounds', value: 5, icon: 'change_circle' },
    { label: 'Max Players', value: 8, icon: 'people' },
    { label: 'Liars', value: 2, icon: 'group' },
    { label: 'Drawing Time (seconds)', value: '60s', icon: 'timer' },
    { label: 'Custom Words', value: 'On', onClick: () => {}, icon: 'abc' },
    { label: 'Room Type', value: 'Private', icon: 'lock' },
  ]
  const { t } = useTranslation()
  return (
    <>
      <Card className='flex flex-col grow w-[320px] gap-2'>
        <div className='flex flex-row gap-2 items-center justify-center'>
          <Icon name='group' />
          <p>
            {t('Players')} ({players.length})
          </p>
        </div>
        <Spacing />
        <div className='flex flex-row flex-wrap gap-4'>
          {players.map(player => (
            <Profile key={player} name={player} />
          ))}
        </div>
      </Card>
      <Card className='flex flex-col grow w-[320px]'>
        <button className='p-2 pt-0 flex flex-row justify-center items-center gap-2'>
          <p>{t('Game Settings')}</p>
          <Icon name='arrow_forward' />
        </button>
        <Spacing />
        <div className='flex flex-col gap-4'>
          {settings.map(({ label, value, onClick, icon }) => (
            <SettingItem
              key={label}
              icon={<Icon name={icon} />}
              label={t(label)}
              value={value}
              onClick={onClick}
            />
          ))}
        </div>
      </Card>
    </>
  )
}
