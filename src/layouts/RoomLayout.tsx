import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { useModal } from 'sam-react-modal'

import Button from '@/components/common/Button'
import Icon from '@/components/common/Icon'
import SettingButtons from '@/components/common/SettingButtons'
import Alert from '@/components/modals/Alert'
import { useBackground } from '@/context/BackgroundContext'
import { useRoom } from '@/context/RoomContext'

export default function RoomLayout() {
  const { t } = useTranslation()
  const { playMusic, setBackgroundImage } = useBackground()

  const { roomCode, CloseButton } = useRoom()
  const { openModal } = useModal()

  useEffect(() => {
    playMusic('waiting')
    setBackgroundImage('room')
  })

  return (
    <div className='flex h-dvh max-h-[1080px] w-full max-w-[1440px] flex-row flex-wrap pb-0 sm:gap-4 sm:p-8 md:gap-6 md:p-12 md:pb-0 lg:p-20 lg:pb-0'>
      <Button
        size='md'
        className='grow-1 sm:min-w-1/2'
        cardClassName='py-2 md:py-3'
        onClick={() => {
          navigator.clipboard.writeText(
            `${import.meta.env.VITE_BASE_URL}/room/${roomCode}`,
          )
          openModal(<Alert>{t('Room link copied to clipboard!')}</Alert>)
        }}
      >
        {t('Room Code')} #{roomCode}
        <Icon name='content_copy' />
      </Button>
      <SettingButtons />
      <CloseButton />
      <Outlet />
    </div>
  )
}
