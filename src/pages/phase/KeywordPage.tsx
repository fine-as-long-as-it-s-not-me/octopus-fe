import { useEffect } from 'react'

import Card from '@/components/common/Card'
import { useSound } from '@/context/SoundContext'
import { useGameStore } from '@/store/gameStore'

export default function KeywordPage() {
  const { playSoundEffect, pauseMusic } = useSound()

  const { keyword } = useGameStore()

  useEffect(() => {
    playSoundEffect('keyword-intro')
    pauseMusic()
  }, [playSoundEffect, pauseMusic])
  return (
    <Card className='flex min-h-[43dvh] w-auto grow-12 flex-col items-center justify-center gap-6 sm:h-auto'>
      <p className='text-2xl'>Your given word is...</p>
      <p className='text-[80px]'>{keyword}</p>
      <p className='text-2xl'>The liar gets different word</p>
    </Card>
  )
}
