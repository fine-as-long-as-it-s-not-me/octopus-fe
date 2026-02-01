import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useUpdateDiscussionTime } from '@/apis/game'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import Canvas from '@/components/game/Canvas'
import CanvasOpenButton from '@/components/game/CanvasOpenButton'
import { useSound } from '@/context/SoundContext'
import { useWindow } from '@/context/WindowContext'

export default function DiscussionPage() {
  const { direction } = useWindow()
  const { mutate: changeTimeLeft } = useUpdateDiscussionTime()
  const { t } = useTranslation()
  const { playSoundEffect, playMusic } = useSound()

  useEffect(() => {
    playSoundEffect('phase')
    playMusic('discuss')
  }, [playSoundEffect, playMusic])

  return (
    <div className={twMerge('flex flex-col sm:gap-2')}>
      {direction === 'vertical' ? (
        <CanvasOpenButton />
      ) : (
        <Card className={twMerge('flex grow items-center justify-center')}>
          <Canvas />
        </Card>
      )}
      <Button
        className='flex shrink-0'
        onClick={() => changeTimeLeft({ type: 'increase' })}
      >
        <div className='flex'>
          <Icon name='timer' />
          <Icon name='add' size={16} />
        </div>
        {t('More Time')}
      </Button>
      <Button
        className='flex shrink-0'
        onClick={() => changeTimeLeft({ type: 'decrease' })}
      >
        <div className='flex'>
          <Icon name='timer' />
          <Icon name='remove' size={16} />
        </div>
        {t('Less Time')}
      </Button>
    </div>
  )
}
