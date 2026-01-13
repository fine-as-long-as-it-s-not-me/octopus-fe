import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'

import ChatCard from '@/components/chat/ChatCard'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import SettingItem from '@/components/game/SettingItem'
import CreateRoomModal from '@/components/modals/CreateRoomModal'
import PlayersCard from '@/components/player/PlayersCard'
import { useRoom } from '@/context/RoomContext'
import { ROUTES } from '@/routes/ROUTES'

export default function RoomPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const roomId = 'roomIdGoesHere'
  const { openModal } = useModal()

  const { setCloseButton } = useRoom()

  useEffect(() => {
    setCloseButton(
      <Button
        size='md'
        onClick={() => navigate(ROUTES.LOBBY)}
        cardClassName='py-2 md:py-3'
      >
        <Icon name={'logout'} />
      </Button>,
    )
  }, [navigate, setCloseButton])

  const startGameClickHandler = () => {
    navigate(ROUTES.KEYWORD(roomId))
  }

  const settings = [
    { label: 'Rounds', value: 5, icon: 'change_circle' },
    { label: 'Max Players', value: 8, icon: 'people' },
    { label: 'Liars', value: 2, icon: 'group' },
    { label: 'Drawing Time (seconds)', value: '60s', icon: 'timer' },
    {
      label: 'Custom Words',
      value: t('On'),
      onClick: () => navigate(ROUTES.KEYWORD_SETTING(roomId)),
      icon: 'abc',
    },
    { label: 'Room Type', value: t('Private'), icon: 'lock' },
  ]
  return (
    <>
      <PlayersCard />
      <div className='flex flex-col gap-4 md:gap-6'>
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
        <Button className='flex grow-2' onClick={startGameClickHandler}>
          <h1>{t('Start Game')}</h1>
        </Button>
      </div>
      <ChatCard />
    </>
  )
}
