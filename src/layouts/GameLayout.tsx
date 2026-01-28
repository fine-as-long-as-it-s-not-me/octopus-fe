import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import ChatCard from '@/components/chat/ChatCard'
import Card from '@/components/common/Card'
import Icon from '@/components/common/Icon'
import SettingModalButton from '@/components/common/Settings'
import PhaseDescCard from '@/components/game/PhaseDescCard'
import TimerCard from '@/components/game/TimerCard'
import PlayerListButton from '@/components/player/PlayerListButton'
import PlayersCard from '@/components/player/PlayerListCard'
import CloseButton from '@/components/room/CloseButton'
import { useBackground } from '@/context/BackgroundContext'
import { useWindow } from '@/context/WindowContext'
import { useGameStore } from '@/store/gameStore'
import { useRoomStore } from '@/store/roomStore'
import { useRoundStore } from '@/store/roundStore'

export default function GameLayout() {
  const { setBackgroundImage } = useBackground()
  const { setIsCompact, direction } = useWindow()
  const { settings } = useRoomStore()
  const { round } = useGameStore()
  const { keyword } = useRoundStore()
  const { t } = useTranslation()

  useEffect(() => {
    setBackgroundImage('room')
    setIsCompact(true)
  }, [setBackgroundImage, setIsCompact])

  return (
    <div className='no-scrollbar flex h-dvh max-h-[1080px] w-full max-w-[1440px] flex-col overflow-scroll sm:gap-4 sm:p-8 md:gap-6 lg:p-16'>
      <div className='flex h-fit w-full flex-row flex-wrap sm:gap-2'>
        <div className='flex min-w-[400px] grow flex-row sm:gap-2'>
          <Card size='md' className='order-0 w-auto shrink-0 items-center'>
            {t('Round')} {round}/{settings.rounds}
          </Card>
          <Card
            size='md'
            className='order-2 flex w-auto shrink-0 flex-row items-center sm:order-1 sm:gap-2'
          >
            <Icon name='abc' />
            <p>{keyword}</p>
          </Card>
          <PhaseDescCard />
        </div>
        <div className='flex grow sm:gap-2'>
          <TimerCard />
          <PlayerListButton />
          <SettingModalButton />
          <CloseButton />
        </div>
      </div>
      <div
        className={twMerge(
          'flex h-[calc(100%-112px)] w-full flex-col sm:h-[calc(100%-80px)] sm:gap-2',
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
