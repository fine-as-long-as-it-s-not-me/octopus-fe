import { useModal } from 'sam-react-modal'

import { useBackground } from '@/context/BackgroundContext'
import { useEffects } from '@/context/EffectsContext'
import LanguageSelectModal from '../modals/LanguageSelectModal'
import Button from './Button'
import Icon from './Icon'

export default function SettingButtons() {
  const { isMuted, muteMusicToggle } = useBackground()
  const { isMuted: isEffectMuted, muteSoundEffectToggle } = useEffects()
  const { openModal } = useModal()
  return (
    <>
      <Button
        size='md'
        onClick={() => {
          openModal(<LanguageSelectModal />)
        }}
      >
        <Icon name='translate' />
      </Button>
      <Button size='md' onClick={() => muteMusicToggle()}>
        <Icon name={isMuted ? 'music_off' : 'music_note'} />
      </Button>
      <Button size='md' onClick={() => muteSoundEffectToggle()}>
        <Icon name={isEffectMuted ? 'volume_off' : 'volume_up'} />
      </Button>
    </>
  )
}
