import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import ChatCard from '@/components/chat/ChatCard'
import Card from '@/components/common/Card'
import SettingButtons from '@/components/common/SettingButtons'
import PlayersCard from '@/components/player/PlayersCard'
import { useRoom } from '@/context/RoomContext'

export default function GameLayout() {
  const { setCloseButton } = useRoom()
  useEffect(() => {
    setCloseButton(null)
  })
  return (
    <div className='flex h-full max-h-[1080px] w-full max-w-[1440px] flex-col gap-4 p-8 pb-0 md:p-12 md:pb-0 lg:p-20 lg:pb-0'>
      <div className='flex gap-4 md:gap-6'>
        <Card size='md' className='w-auto grow-1'>
          Round 1/3
        </Card>
        <Card size='md' className='w-auto grow-1'>
          Fish
        </Card>
        <Card size='md' className='w-auto grow-4'>
          check your given word
        </Card>
        <div className='flex grow-2 gap-4'>
          <SettingButtons />
        </div>
      </div>
      <div className='no-scrollbar flex h-[80vh] flex-row flex-wrap gap-4 overflow-scroll md:gap-6'>
        <PlayersCard />
        <Outlet /> <ChatCard />
      </div>
    </div>
  )
}
