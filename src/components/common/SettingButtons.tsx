import { useBackground } from '@/context/BackgroundContext'
import { useEffects } from '@/context/EffectsContext'
import Button from './Button'
import Icon from './Icon'

export default function SettingButtons() {
  const { isMuted, muteMusicToggle } = useBackground()
  const { isMuted: isEffectMuted, muteSoundEffectToggle } = useEffects()
  return (
    <div className='grid grid-cols-3 gap-4 w-full'>
      <Button size='md'>
        <Icon name='translate' />
      </Button>
      <Button size='md' onClick={() => muteMusicToggle()}>
        <Icon name={isMuted ? 'music_off' : 'music_note'} />
      </Button>
      <Button size='md' onClick={() => muteSoundEffectToggle()}>
        <Icon name={isEffectMuted ? 'volume_off' : 'volume_up'} />
      </Button>
    </div>
  )
}
