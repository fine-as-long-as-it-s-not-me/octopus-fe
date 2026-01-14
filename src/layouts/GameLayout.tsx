import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import ChatCard from '@/components/chat/ChatCard'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import SettingButtons from '@/components/common/SettingButtons'
import PhaseDescCard from '@/components/game/PhaseDescCard'
import TimerCard from '@/components/game/TimerCard'
import PlayersCard from '@/components/player/PlayerListCard'
import { useBackground } from '@/context/BackgroundContext'
import { useRoom } from '@/context/RoomContext'

export default function GameLayout() {
  const { setBackgroundImage } = useBackground()
  const { CloseButton } = useRoom()
  useEffect(() => {
    setBackgroundImage('room')
  })

  useEffect(() => {})
  return (
    <div className='flex h-full max-h-[1080px] w-full max-w-[1440px] flex-col p-8 pb-0 sm:gap-4 md:p-12 md:pb-0 lg:p-20 lg:pb-0'>
      <div className='flex flex-wrap sm:gap-4 md:gap-6'>
        <Card size='md' className='w-auto items-center'>
          Round 1/3
        </Card>
        <Card size='md' className='flex w-auto flex-row items-center sm:gap-2'>
          <Icon name='abc' />
          <p>Fish</p>
        </Card>
        <PhaseDescCard />
        <div className='flex grow-2 sm:gap-4'>
          <TimerCard />
          <SettingButtons />
          <CloseButton />
        </div>
      </div>
      <div className='no-scrollbar flex h-[80vh] flex-row flex-wrap overflow-scroll sm:gap-4 md:gap-6'>
        <PlayersCard />
        <Outlet /> <ChatCard />
      </div>
    </div>
  )
}
