import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'

import { useRoom } from '@/context/RoomContext'
import { ROUTES } from '@/routes/ROUTES'
import Card from '../common/Card'
import Icon from '../common/Icon'
import CreateRoomModal from '../modals/CreateRoomModal'
import SettingItem from './SettingItem'

export default function GameSettingListCard() {
  const { openModal } = useModal()
  const { t } = useTranslation()
  const { setting, roomCode } = useRoom()
  const navigate = useNavigate()

  return (
    <Card className='flex w-full flex-col'>
      <button
        className='flex flex-row items-center justify-center gap-2 p-2 pt-0'
        onClick={() => openModal(<CreateRoomModal />)}
      >
        <p>{t('Game Settings')}</p>
        <Icon name='arrow_forward' />
      </button>
      <Spacing />
      <div className='no-scrollbar flex min-w-[160px] flex-row flex-wrap gap-4 overflow-scroll sm:flex-col sm:flex-nowrap sm:gap-4'>
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
          value={`${setting.drawingTime}${t('s')}`}
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
  )
}
