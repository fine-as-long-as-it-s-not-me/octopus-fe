import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import { useSound } from '@/context/SoundContext'
import LanguageSelectModal from '../modals/LanguageSelectModal'
import Button from './Button'
import Icon from './Icon'

interface SettingButtonProps {
  onClick: () => void
  iconName: string
  className?: string
  ariaLabel: string
}

function SettingButton({ onClick, iconName, className, ariaLabel }: SettingButtonProps) {
  return (
    <Button
      size='md'
      className='h-full grow-1 self-center sm:flex'
      cardClassName={twMerge(`h-auto py-2 md:py-3 grow-1 h-full`, className)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon name={iconName} />
    </Button>
  )
}

interface Props {
  className?: string
}

export default function SettingButtons({ className }: Props) {
  const {
    isMusicMuted,
    isEffectMuted,
    muteSoundEffectToggle,
    muteMusicToggle,
  } = useSound()
  const { openModal } = useModal()

  const buttons = [
    {
      onClick: () => {
        openModal(<LanguageSelectModal />)
      },
      iconName: 'translate',
      ariaLabel: 'Change language',
    },
    {
      onClick: () => muteMusicToggle(),
      iconName: isMusicMuted ? 'music_off' : 'music_note',
      ariaLabel: isMusicMuted ? 'Unmute music' : 'Mute music',
    },
    {
      onClick: () => muteSoundEffectToggle(),
      iconName: isEffectMuted ? 'volume_off' : 'volume_up',
      ariaLabel: isEffectMuted ? 'Unmute sound effects' : 'Mute sound effects',
    },
  ]

  return (
    <>
      {buttons.map((button, index) => (
        <SettingButton
          key={index}
          onClick={button.onClick}
          iconName={button.iconName}
          ariaLabel={button.ariaLabel}
          className={className}
        />
      ))}
    </>
  )
}
