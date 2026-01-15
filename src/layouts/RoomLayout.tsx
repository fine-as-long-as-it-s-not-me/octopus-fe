import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { useModal } from 'sam-react-modal'

import Button from '@/components/common/Button'
import Icon from '@/components/common/Icon'
import SettingButtons from '@/components/common/SettingButtons'
import SettingModalButton from '@/components/common/SettingModalButton'
import CloseButton from '@/components/game/CloseButton'
import Alert from '@/components/modals/Alert'
import PlayerListButton from '@/components/player/PlayerListButton'
import { useBackground } from '@/context/BackgroundContext'
import { useRoom } from '@/context/RoomContext'
import { useWindow } from '@/context/WindowContext'

export default function RoomLayout() {
  const { t } = useTranslation()
  const { playMusic, setBackgroundImage } = useBackground()

  const { roomCode } = useRoom()
  const { openModal } = useModal()
  const { size } = useWindow()

  useEffect(() => {
    playMusic('waiting')
    setBackgroundImage('room')
  })

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_BASE_URL}/room/${roomCode}`,
    )
    openModal(<Alert>{t('Room link copied to clipboard!')}</Alert>)
  }

  return (
    <div className='no-scrollbar flex h-dvh max-h-[1080px] w-full max-w-[1440px] flex-col overflow-scroll sm:gap-4 sm:p-8 md:gap-6 md:p-12 lg:p-20'>
      <div className='flex h-fit w-full flex-row sm:gap-2'>
        <Button
          size='md'
          className='grow-1 self-stretch sm:min-w-1/2'
          cardClassName='py-2 md:py-3 h-full'
          onClick={copyLinkHandler}
        >
          {t('Room Code')} #{roomCode}
          <Icon name='content_copy' />
        </Button>
        <PlayerListButton />
        {size.sm ? <SettingButtons /> : <SettingModalButton />}
        <CloseButton />
      </div>
      <div className='flex h-full w-full flex-col sm:h-[calc(100%-80px)] sm:flex-row sm:gap-2'>
        <Outlet />
      </div>
    </div>
  )
}
