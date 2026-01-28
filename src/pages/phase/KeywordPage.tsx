import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Card from '@/components/common/Card'
import { useSound } from '@/context/SoundContext'
import { useGameStore } from '@/store/gameStore'

export default function KeywordPage() {
  const { playSoundEffect, pauseMusic } = useSound()
  const { keyword } = useGameStore()
  const { t } = useTranslation()

  useEffect(() => {
    playSoundEffect('keyword-intro')
    pauseMusic()
  }, [playSoundEffect, pauseMusic])
  return (
    <Card className='flex min-h-[43dvh] w-auto grow-12 flex-col items-center justify-center gap-6 sm:h-auto'>
      <p className='text-2xl'>{t('The secret code is...')}</p>
      <p className='text-[80px]'>{keyword}</p>
      <p className='text-2xl'>{t('The octopus gets different word.')}</p>
    </Card>
  )
}
