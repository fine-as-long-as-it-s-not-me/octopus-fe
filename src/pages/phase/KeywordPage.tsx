import { useEffect } from 'react'

import Card from '@/components/common/Card'
import { useBackground } from '@/context/BackgroundContext'
import { useEffects } from '@/context/EffectsContext'

export default function KeywordPage() {
  const { pauseMusic } = useBackground()
  const { playSoundEffect } = useEffects()
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
