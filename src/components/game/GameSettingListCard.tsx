import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import { parseCountryCodeToLang } from '@/lib/language'
import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'
import Card from '../common/Card'
import Icon from '../common/Icon'
import CreateRoomModal from '../modals/CreateRoomModal'
import SettingItem from '../room/SettingItem'

interface Props {
  isHost?: boolean
}

export default function GameSettingListCard({ isHost }: Props) {
  const { openModal } = useModal()
  const { t } = useTranslation()
  const { settings } = useRoomStore()
  const navigate = useNavigate()

  return (
    <Card className='flex w-full grow-2 flex-col sm:min-w-[240px]'>
      <button
        className='flex flex-row items-center justify-center gap-2 p-2 pt-0'
        onClick={() => openModal(<CreateRoomModal action='change' />)}
        disabled={!isHost}
      >
        <p>{t('Game Settings')}</p>
        {isHost && <Icon name='arrow_forward' />}
      </button>
      <Spacing />
      <div
        className={twMerge(
          'no-scrollbar flex w-full flex-row flex-wrap items-center justify-center gap-4 overflow-scroll sm:gap-4',
        )}
      >
        <SettingItem
          icon={<Icon name='change_circle' />}
          label={t('Rounds')}
          value={settings.rounds.toString()}
        />
        <SettingItem
          icon={<Icon name='group' />}
          label={t('Max Players')}
          value={settings.maxPlayers.toString()}
        />
        <SettingItem
          icon={<Icon name='help_outline' />}
          label={t('Octopus Amount')}
          value={settings.octopusAmount.toString()}
        />
        <SettingItem
          icon={<Icon name='timer' />}
          label={t('Drawing Time')}
          value={`${settings.drawingTime}${t('s')}`}
        />
        <SettingItem
          icon={<Icon name='edit' />}
          label={t('Custom Words')}
          value={t(settings.useCustomWord ? 'On' : 'Off')}
          onClick={
            settings.useCustomWord
              ? () => {
                  navigate(ROUTES.CUSTOM_WORD)
                }
              : undefined
          }
        />
        <SettingItem
          icon={<Icon name='lock_open' />}
          label={t('Room Type')}
          value={settings.isPublic ? t('Public') : t('Private')}
        />
        <SettingItem
          icon={<Icon name='translate' />}
          label={t('Language')}
          value={t(parseCountryCodeToLang(settings.lang))}
        />
      </div>
    </Card>
  )
}
