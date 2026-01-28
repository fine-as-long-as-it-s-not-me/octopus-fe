import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import Button from '@/components/common/Button'
import Icon from '@/components/common/Icon'
import SettingButtons from '@/components/common/SettingButtons'
import SettingModalButton from '@/components/common/Settings'
import Alert from '@/components/modals/Alert'
import PlayerListButton from '@/components/player/PlayerListButton'
import CloseButton from '@/components/room/CloseButton'
import { useBackground } from '@/context/BackgroundContext'
import { useSound } from '@/context/SoundContext'
import { useWindow } from '@/context/WindowContext'
import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'

export default function RoomLayout() {
  const { t } = useTranslation()
  const { setBackgroundImage } = useBackground()
  const { playMusic } = useSound()
  const { roomCode } = useRoomStore()
  const { openModal } = useModal()
  const { size, setIsCompact, direction } = useWindow()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    playMusic('waiting')
    setBackgroundImage('room')
    setIsCompact(true)
  }, [playMusic, setBackgroundImage, setIsCompact])

  useEffect(() => {
    const targetRoute = !roomCode ? ROUTES.LOBBY : ROUTES.WAITING
    if (location.pathname !== targetRoute) {
      navigate(targetRoute)
    }
  }, [roomCode, navigate, location.pathname])

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_BASE_URL}/room/${roomCode}`,
    )
    openModal(<Alert>{t('Room link copied to clipboard!')}</Alert>)
  }

  return (
    <div className='no-scrollbar flex h-dvh max-h-[1080px] w-full max-w-[1440px] flex-col overflow-scroll sm:gap-4 sm:p-8 md:gap-6 lg:p-16'>
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
        {import.meta.env.DEV && (
          <Button className='w-fit' onClick={() => navigate(ROUTES.TEST!)}>
            TEST
          </Button>
        )}
        <PlayerListButton />
        {size.sm ? <SettingButtons /> : <SettingModalButton />}
        <CloseButton />
      </div>
      <div
        className={twMerge(
          'flex h-[calc(100%-54px)] w-full sm:h-[calc(100%-80px)] sm:gap-2',
          direction === 'vertical' ? 'flex-col' : 'flex-row',
        )}
      >
        <Outlet />
      </div>
    </div>
  )
}
