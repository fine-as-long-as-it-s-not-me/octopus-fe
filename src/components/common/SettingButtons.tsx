import { useEffect, useRef, useState } from 'react'
import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import { useSound } from '@/context/SoundContext'
import { useToast } from '@/context/ToastContext'
import { useWindow } from '@/context/WindowContext'
import LanguageSelectModal from '../modals/LanguageSelectModal'
import Button from './Button'
import Icon from './Icon'
import VolumeControl from './VolumeControl'

interface Props {
  className?: string
  translate?: boolean
}

export default function SettingButtons({ className, translate = true }: Props) {
  const {
    isMusicMuted,
    muteMusicToggle,
    isEffectMuted,
    muteSoundEffectToggle,
    effectVolume,
    setEffectVolume,
    musicVolume,
    setMusicVolume,
  } = useSound()
  const { fullscreenToggle, isFullscreen } = useWindow()
  const { openModal } = useModal()
  const { toast } = useToast()

  const ref = useRef(null)
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>(
    'vertical',
  )

  useEffect(() => {
    if (!ref.current) return
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        setDirection(width >= 110 ? 'horizontal' : 'vertical')
      }
    })
    resizeObserver.observe(ref.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <>
      {translate && (
        <Button
          size='md'
          className='h-full grow-1 self-center sm:flex'
          cardClassName={twMerge(
            `h-auto py-2 md:py-3 grow-1 h-full`,
            className,
          )}
          onClick={() => {
            openModal(<LanguageSelectModal />)
          }}
          aria-label={'Change language'}
        >
          <Icon name='translate' />
        </Button>
      )}
      <div
        className='group relative h-full grow-1 self-center sm:flex'
        ref={ref}
      >
        <Button
          size='md'
          className='h-full w-full grow-1 self-center sm:flex'
          cardClassName={twMerge(
            `h-auto py-2 md:py-3 grow-1 h-full`,
            className,
          )}
          onClick={() => muteMusicToggle()}
          aria-label={isMusicMuted ? 'Unmute music' : 'Mute music'}
        >
          <Icon name={isMusicMuted ? 'music_off' : 'music_note'} />
        </Button>
        {!isMusicMuted && (
          <VolumeControl
            value={musicVolume}
            onChange={setMusicVolume}
            direction={direction}
          />
        )}
      </div>
      <div className='group relative h-full grow-1 self-center sm:flex'>
        <Button
          size='md'
          className='h-full w-full grow-1 self-center sm:flex'
          cardClassName={twMerge(
            `h-auto py-2 md:py-3 grow-1 h-full `,
            className,
          )}
          onClick={() => muteSoundEffectToggle()}
          aria-label={
            isEffectMuted ? 'Unmute sound effects' : 'Mute sound effects'
          }
        >
          <Icon name={isEffectMuted ? 'volume_off' : 'volume_up'} />
        </Button>
        {!isEffectMuted && (
          <VolumeControl
            value={effectVolume}
            onChange={setEffectVolume}
            direction={direction}
          />
        )}
      </div>
      <Button
        size='md'
        className='h-full grow-1 self-center sm:flex'
        cardClassName={twMerge(`h-auto py-2 md:py-3 grow-1 h-full`, className)}
        onClick={() =>
          fullscreenToggle(() => {
            toast("Device doesn't support fullscreen mode.")
          })
        }
        aria-label={'Toggle fullscreen mode'}
      >
        <Icon name={isFullscreen ? 'fullscreen_exit' : 'fullscreen'} />
      </Button>
    </>
  )
}
