import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import ChatCard from '@/components/chat/ChatCard'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import SettingModalButton from '@/components/common/SettingModalButton'
import NextPhaseButton from '@/components/game/NextPhaseButton'
import PhaseDescCard from '@/components/game/PhaseDescCard'
import TimerCard from '@/components/game/TimerCard'
import PlayerListButton from '@/components/player/PlayerListButton'
import PlayersCard from '@/components/player/PlayerListCard'
import CloseButton from '@/components/room/CloseButton'
import { useBackground } from '@/context/BackgroundContext'
import { useRoom } from '@/context/RoomContext'
import { useWindow } from '@/context/WindowContext'
import { getPhasePath } from '@/utils/getPhasePath'

export default function GameLayout() {
  const { setBackgroundImage } = useBackground()
  const { setIsCompact, direction } = useWindow()
  const { phase, roomCode } = useRoom()
  const navigate = useNavigate()

  useEffect(() => {
    setBackgroundImage('room')
    setIsCompact(true)
  }, [])

  useEffect(() => {
    navigate(getPhasePath(phase, roomCode), { replace: true })
  }, [phase, roomCode, navigate])

  return (
    <div className='no-scrollbar flex h-dvh max-h-[1080px] w-full max-w-[1440px] flex-col overflow-scroll sm:gap-4 sm:p-8 md:gap-6 lg:p-16'>
      <div className='flex h-fit w-full flex-row flex-wrap sm:flex-nowrap sm:gap-2'>
        <div className='flex w-[400px] grow flex-row sm:gap-2'>
          <Card size='md' className='order-0 w-auto shrink-0 items-center'>
            Round 1/3
          </Card>
          <Card
            size='md'
            className='order-2 flex w-auto shrink-0 flex-row items-center sm:order-1 sm:gap-2'
          >
            <Icon name='abc' />
            <p>Fish</p>
          </Card>
          <PhaseDescCard />
        </div>
        <div className='flex grow sm:grow-0 sm:gap-2'>
          <TimerCard />
          <PlayerListButton />
          {import.meta.env.DEV && <NextPhaseButton />}
          <SettingModalButton />
          <CloseButton />
        </div>
      </div>
      <div
        className={twMerge(
          'flex h-full w-full flex-col sm:h-[calc(100%-80px)] sm:gap-2',
          direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        )}
      >
        <PlayersCard />
        <Outlet />
        <ChatCard />
      </div>
    </div>
  )
}
