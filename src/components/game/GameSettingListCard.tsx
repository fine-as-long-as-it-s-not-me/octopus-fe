import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import { useWindow } from '@/context/WindowContext'
import { parseCountryCodeToLang } from '@/lib/language'
import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'
import Card from '../common/Card'
import Icon from '../common/Icon'
import ToolTip from '../common/ToolTip'
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
  const { direction } = useWindow()

  return (
    <Card
      className={twMerge(
        'flex w-full flex-col gap-2 sm:min-w-[240px] sm:gap-4',
        direction === 'vertical' ? 'grow-0' : 'grow-1',
      )}
    >
      <button
        className='flex flex-row items-center justify-center gap-2 p-2 pt-0'
        onClick={() => openModal(<CreateRoomModal action='change' />)}
        disabled={!isHost}
      >
        <p>{t('Game Settings')}</p>
        {isHost && <Icon name='arrow_forward' />}
      </button>
      <div
        className={twMerge(
          'no-scrollbar flex w-full flex-row flex-wrap items-center justify-center gap-2 overflow-scroll sm:gap-4',
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
        <ToolTip tip='More players, more octopuses'>
          <SettingItem
            underline
            icon={<Icon name='domino_mask' />}
            label={t('Octopus Amount')}
            value={settings.octopusAmount.toString()}
          />
        </ToolTip>
        <SettingItem
          icon={<Icon name='timer' />}
          label={t('Drawing Time')}
          value={`${settings.drawingTime}${t('s')}`}
        />
        <ToolTip tip='Octopuses also get a Keyword without even knowing they’re octopuses.'>
          <SettingItem
            icon={<Icon name='indeterminate_question_box' />}
            label={t('Fool Mode')}
            value={settings.isFoolMode ? t('On') : t('Off')}
            underline
          />
        </ToolTip>
        <ToolTip tip='Use your own words as keywords!'>
          <SettingItem
            underline
            icon={<Icon name='edit' />}
            label={t('Custom Keywords')}
            value={settings.useCustomKeyword ? t('On') : t('Off')}
            onClick={
              settings.useCustomKeyword
                ? () => {
                    navigate(ROUTES.CUSTOM_WORD)
                  }
                : undefined
            }
          />
        </ToolTip>
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
