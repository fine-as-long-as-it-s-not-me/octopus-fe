import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import { useRoom } from '@/context/RoomContext'
import { useWindow } from '@/context/WindowContext'
import { ROUTES } from '@/routes/ROUTES'
import Card from '../common/Card'
import Icon from '../common/Icon'
import CreateRoomModal from '../modals/CreateRoomModal'
import SettingItem from '../room/SettingItem'

export default function GameSettingListCard() {
  const { openModal } = useModal()
  const { t } = useTranslation()
  const { setting } = useRoom()
  const navigate = useNavigate()
  const { direction } = useWindow()

  return (
    <Card className='flex w-full grow-2 flex-col sm:min-w-[240px]'>
      <button
        className='flex flex-row items-center justify-center gap-2 p-2 pt-0'
        onClick={() => openModal(<CreateRoomModal />)}
      >
        <p>{t('Game Settings')}</p>
        <Icon name='arrow_forward' />
      </button>
      <Spacing />
      <div
        className={twMerge(
          'no-scrollbar flex flex-row flex-wrap items-center gap-4 overflow-scroll sm:gap-4',
          direction === 'vertical' ? '' : 'max-w-[400px]',
        )}
      >
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
                  navigate(ROUTES.CUSTOM_WORD)
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
