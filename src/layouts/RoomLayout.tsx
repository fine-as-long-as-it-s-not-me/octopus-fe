import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'

import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import SettingButtons from '@/components/common/SettingButtons'
import { useBackground } from '@/context/BackgroundContext'
import { ROUTES } from '@/routes/ROUTES'

export default function RoomLayout() {
  const { playMusic, setBackgroundImage } = useBackground()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const roomCode = '3561'

  useEffect(() => {
    playMusic('lobby')
    setBackgroundImage('room')
  })

  return (
    <div className='flex h-full max-h-[1080px] w-full max-w-[1440px] flex-col gap-4 p-8 pb-0 md:p-12 md:pb-0 lg:p-20 lg:pb-0'>
      <div className='flex flex-row flex-wrap gap-4 md:gap-6'>
        <Button
          size='md'
          className='min-w-[360px] grow-1'
          onClick={() => {
            navigator.clipboard.writeText(
              `${import.meta.env.VITE_BASE_URL}/room/${roomCode}`,
            )
            alert(t('Room link copied to clipboard!'))
          }}
        >
          {t('Room Code')} {roomCode}
          <Icon name='content_copy' />
        </Button>
        <div className='flex grow-1 gap-4'>
          <SettingButtons />
          <Button
            size='md'
            onClick={() => navigate(ROUTES.LOBBY)}
            className='grow-1'
          >
            <Icon name={'logout'} />
          </Button>
        </div>
      </div>
      <div className='no-scrollbar flex flex-row flex-wrap gap-4 overflow-scroll md:gap-6'>
        <Outlet />
        <Card className='flex w-[320px] grow-1'>{t('Chat')}</Card>
      </div>
    </div>
  )
}
