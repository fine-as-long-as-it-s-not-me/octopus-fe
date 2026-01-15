import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import ChatCard from '@/components/chat/ChatCard'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import SettingButtons from '@/components/common/SettingButtons'
import CloseButton from '@/components/game/CloseButton'
import PhaseDescCard from '@/components/game/PhaseDescCard'
import TimerCard from '@/components/game/TimerCard'
import PlayersCard from '@/components/player/PlayerListCard'
import { useBackground } from '@/context/BackgroundContext'

export default function GameLayout() {
  const { setBackgroundImage } = useBackground()
  useEffect(() => {
    setBackgroundImage('room')
  })

  useEffect(() => {})
  return (
    <div className='flex h-full max-h-[1080px] w-full max-w-[1440px] flex-row flex-wrap pb-0 sm:gap-4 sm:p-8 md:gap-6 md:p-12 md:pb-0 lg:p-20 lg:pb-0'>
      <Card size='md' className='w-auto items-center'>
        Round 1/3
      </Card>
      <Card size='md' className='flex w-auto flex-row items-center sm:gap-2'>
        <Icon name='abc' />
        <p>Fish</p>
      </Card>
      <PhaseDescCard />
      <TimerCard />
      <SettingButtons />
      <CloseButton />
      <PlayersCard />
      <Outlet /> <ChatCard />
    </div>
  )
}
