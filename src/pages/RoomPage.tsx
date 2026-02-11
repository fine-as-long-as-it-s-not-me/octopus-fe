import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useStartGame } from '@/apis/game'
import ChatCard from '@/components/chat/ChatCard'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import GameSettingListCard from '@/components/game/GameSettingListCard'
import PlayerListCard from '@/components/player/PlayerListCard'
import { useToast } from '@/context/ToastContext'
import { useWindow } from '@/context/WindowContext'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'

export default function RoomPage() {
  const { t } = useTranslation()

  const { mutate: startGame } = useStartGame()
  const { players, hostUUID } = useRoomStore()
  const { UUID } = useUserStore()
  const { toast } = useToast()
  const { direction } = useWindow()

  const isHost = hostUUID === UUID

  const startGameClickHandler = () => {
    if (import.meta.env.PROD && players.length < 3) {
      toast('At least 3 residents are required to start the debate.')
      return
    }
    startGame()
  }

  return (
    <>
      <PlayerListCard />
      <div className='flex flex-col sm:gap-2'>
        <GameSettingListCard isHost={isHost} />
        {isHost ? (
          <Button
            className={twMerge(
              'flex',
              direction === 'vertical' ? 'grow-0' : 'grow-1',
            )}
            onClick={startGameClickHandler}
          >
            <h1>{t('Start Game')}</h1>
          </Button>
        ) : (
          <Card
            className={twMerge(
              'flex grow-1 items-center justify-center',
              direction === 'vertical' ? 'grow-0' : 'grow-1',
            )}
          >
            <h3 className='text-center'>
              {t('Waiting for host to start the game...')}
            </h3>
          </Card>
        )}
      </div>
      <ChatCard />
    </>
  )
}
