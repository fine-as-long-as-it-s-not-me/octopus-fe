import { useModal } from 'sam-react-modal'

import { useSound } from '@/context/SoundContext'
import LanguageSelectModal from '../modals/LanguageSelectModal'
import Button from './Button'
import Icon from './Icon'

function SettingButton({
  onClick,
  iconName,
}: {
  onClick: () => void
  iconName: string
}) {
  return (
    <Button
      size='md'
      className='h-full grow-1 self-center sm:flex'
      cardClassName='h-auto py-2 md:py-3 grow-1 h-full'
      onClick={onClick}
    >
      <Icon name={iconName} />
    </Button>
  )
}

export default function SettingButtons() {
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
    },
    {
      onClick: () => muteMusicToggle(),
      iconName: isMusicMuted ? 'music_off' : 'music_note',
    },
    {
      onClick: () => muteSoundEffectToggle(),
      iconName: isEffectMuted ? 'volume_off' : 'volume_up',
    },
  ]

  return (
    <>
      {buttons.map((button, index) => (
        <SettingButton
          key={index}
          onClick={button.onClick}
          iconName={button.iconName}
        />
      ))}
    </>
  )
}
