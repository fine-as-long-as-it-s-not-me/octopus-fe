import { useEffect } from 'react'

import Card from '@/components/common/Card'
import { useSound } from '@/context/SoundContext'

export default function KeywordPage() {
  const { playSoundEffect, pauseMusic } = useSound()
  useEffect(() => {
    playSoundEffect('keyword-intro')
    pauseMusic()
  }, [])
  return (
    <Card className='flex min-h-[43dvh] w-auto grow-12 flex-col items-center justify-center gap-6 sm:h-auto'>
      <p className='text-2xl'>Your given word is...</p>
      <p className='text-[80px]'>Fish</p>
      <p className='text-2xl'>The liar gets different word</p>
    </Card>
  )
}
