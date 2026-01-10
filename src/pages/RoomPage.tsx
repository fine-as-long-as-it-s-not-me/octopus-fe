import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'

import ChatCard from '@/components/chat/ChatCard'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import SettingItem from '@/components/game/SettingItem'
import CreateRoomModal from '@/components/modals/CreateRoomModal'
import PlayersCard from '@/components/player/PlayersCard'
import { ROUTES } from '@/routes/ROUTES'

export default function RoomPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const roomId = 'roomIdGoesHere'
  const { openModal } = useModal()

  const settings = [
    { label: 'Rounds', value: 5, icon: 'change_circle' },
    { label: 'Max Players', value: 8, icon: 'people' },
    { label: 'Liars', value: 2, icon: 'group' },
    { label: 'Drawing Time (seconds)', value: '60s', icon: 'timer' },
    {
      label: 'Custom Words',
      value: 'On',
      onClick: () => navigate(ROUTES.KEYWORD(roomId)),
      icon: 'abc',
    },
    { label: 'Room Type', value: 'Private', icon: 'lock' },
  ]
  return (
    <>
      <PlayersCard />
      <Card className='flex w-[320px] grow flex-col'>
        <button
          className='flex flex-row items-center justify-center gap-2 p-2 pt-0'
          onClick={() => openModal(<CreateRoomModal />)}
        >
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
      <ChatCard />
    </>
  )
}
