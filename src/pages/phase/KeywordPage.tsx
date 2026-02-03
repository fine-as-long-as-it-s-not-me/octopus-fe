import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Card from '@/components/common/Card'
import { useSound } from '@/context/SoundContext'
import { useRoundStore } from '@/store/roundStore'

export default function KeywordPage() {
  const { playSoundEffect, pauseMusic } = useSound()
  const { keyword } = useRoundStore()
  const { t } = useTranslation()

  useEffect(() => {
    playSoundEffect('keyword-intro')
    pauseMusic()
  }, [playSoundEffect, pauseMusic])
  return (
    <Card className='flex min-h-[43dvh] w-auto grow-12 flex-col items-center justify-center gap-6 text-center sm:h-auto'>
      {keyword === '' ? (
        <>
          <p className='text-[80px] break-words'>{t('You are the Octopus.')}</p>
          <p className='text-2xl'>{t('Guess what others draw.')}</p>
        </>
      ) : (
        <>
          <p className='text-2xl'>{t('The secret code is...')}</p>
          <p className='text-[80px]'>{keyword}</p>
          <p className='text-2xl'>{t('The octopus gets different word.')}</p>
        </>
      )}
    </Card>
  )
}
