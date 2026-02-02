import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import Canvas from '@/components/game/Canvas'
import Palette from '@/components/game/Palette'
import { useSound } from '@/context/SoundContext'
import { useToast } from '@/context/ToastContext'
import { useWindow } from '@/context/WindowContext'
import { useRoundStore } from '@/store/roundStore'
import { useUserStore } from '@/store/userStore'

export default function DrawingPage() {
  const { direction } = useWindow()
  const { painterUUID } = useRoundStore()
  const { UUID } = useUserStore()
  const { playMusic } = useSound()
  const { toast } = useToast()
  const { t } = useTranslation()

  const isDrawing = UUID === painterUUID

  useEffect(() => {
    if (isDrawing) playMusic('drawing')
    else playMusic('kidsgame')
  }, [isDrawing, playMusic])

  useEffect(() => {
    if (!isDrawing) return

    toast(t("It's your turn!"))
  }, [isDrawing, toast, t])

  return (
    <div
      className={twMerge(
        'flex flex-col items-center overflow-hidden sm:gap-2',
        direction === 'vertical' ? 'sm:max-h-[60vh]' : 'grow-1',
      )}
    >
      <Canvas />
      {isDrawing && <Palette />}
    </div>
  )
}
