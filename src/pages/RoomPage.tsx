import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'

import ChatCard from '@/components/chat/ChatCard'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import SettingItem from '@/components/game/SettingItem'
import CreateRoomModal from '@/components/modals/CreateRoomModal'
import PlayersCard from '@/components/player/PlayerListCard'
import { useRoom } from '@/context/RoomContext'
import { ROUTES } from '@/routes/ROUTES'

export default function RoomPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { roomCode } = useRoom()
  const { openModal } = useModal()

  const { setting, startGame } = useRoom()

  const startGameClickHandler = () => {
    startGame()
    navigate(ROUTES.KEYWORD(roomCode))
  }

  return (
    <>
      <PlayersCard />
      <div className='flex min-w-[320px] grow-16 flex-col gap-4 md:gap-6'>
        <Card className='flex flex-col'>
          <button
            className='flex flex-row items-center justify-center gap-2 p-2 pt-0'
            onClick={() => openModal(<CreateRoomModal />)}
          >
            <p>{t('Game Settings')}</p>
            <Icon name='arrow_forward' />
          </button>
          <Spacing />
          <div className='flex flex-col gap-4'>
            <SettingItem
              icon={<Icon name='change_circle' />}
              label={t('Rounds')}
              value={setting.rounds.toString()}
            />
            <SettingItem
              icon={<Icon name='group' />}
              label={t('Max Players')}
              value={setting.maxPlayers.toString()}
            />
            <SettingItem
              icon={<Icon name='help_outline' />}
              label={t('Liars')}
              value={setting.liars.toString()}
            />
            <SettingItem
              icon={<Icon name='timer' />}
              label={t('Drawing Time')}
              value={`${setting.drawingTime} ${t('s')}`}
            />
            <SettingItem
              icon={<Icon name='edit' />}
              label={t('Custom Words')}
              value={t(setting.customWords ? 'On' : 'Off')}
              onClick={
                setting.customWords
                  ? () => {
                      navigate(ROUTES.CUSTOM_WORD(roomCode))
                    }
                  : undefined
              }
            />
            <SettingItem
              icon={<Icon name='lock_open' />}
              label={t('Room Type')}
              value={setting.roomType === 'public' ? t('Public') : t('Private')}
            />
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
