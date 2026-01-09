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

  useEffect(() => {
    playMusic('lobby')
    setBackgroundImage('room')
  })

  return (
    <div className='flex flex-col w-full h-full p-4 gap-4'>
      <div className='flex flex-row gap-2'>
        <Button size='md' className='grow-1'>
          Room #3561
        </Button>
        <SettingButtons />
        <Button size='md' onClick={() => navigate(ROUTES.LOBBY)}>
          <Icon name={'logout'} />
        </Button>
      </div>
      <div className='flex flex-row'>
        <Outlet />
        <Card>CHAT</Card>
      </div>
    </div>
  )
}
