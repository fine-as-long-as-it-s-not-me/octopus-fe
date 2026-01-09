import { useEffect } from 'react'
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

  const roomCode = '3561'

  useEffect(() => {
    playMusic('lobby')
    setBackgroundImage('room')
  })

  return (
    <div className='max-w-[1440px] max-h-[1080px] flex flex-col w-full h-full p-8 md:p-12 lg:p-20 gap-4'>
      <div className='flex flex-row flex-wrap gap-4 md:gap-6'>
        <Button
          size='md'
          className='min-w-[360px] grow-1'
          onClick={() => {
            navigator.clipboard.writeText(
              `${import.meta.env.VITE_BASE_URL}/room/${roomCode}`,
            )
            alert('Room link copied to clipboard!')
          }}
        >
          Room #3561
          <Icon name='content_copy' />
        </Button>
        <div className='grow-1 flex gap-4'>
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
      <div className='flex flex-row flex-wrap gap-4 md:gap-6'>
        <Outlet />
        <Card className='flex grow-1 w-[320px]'>CHAT</Card>
      </div>
    </div>
  )
}
