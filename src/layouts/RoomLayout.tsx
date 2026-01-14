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
    <div className='flex h-full max-h-[1080px] w-full max-w-[1440px] flex-col gap-4 p-8 pb-0 md:p-12 md:pb-0 lg:p-20 lg:pb-0'>
      <div className='flex flex-row flex-wrap gap-4 md:gap-6'>
        <Button
          size='md'
          className='min-w-[360px] grow-1'
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
        <div className='flex grow-1 gap-4'>
          <SettingButtons />
          <CloseButton />
        </div>
      </div>
      <div className='no-scrollbar flex h-[80vh] flex-row flex-wrap gap-4 overflow-scroll md:gap-6'>
        <Outlet />
      </div>
    </div>
  )
}
