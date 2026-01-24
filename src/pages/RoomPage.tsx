import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import ChatCard from '@/components/chat/ChatCard'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import GameSettingListCard from '@/components/game/GameSettingListCard'
import PlayerListCard from '@/components/player/PlayerListCard'
import { useSocket } from '@/context/SocketContext'
import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'

export default function RoomPage() {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const { startGame } = useSocket()
  const { players } = useRoomStore()
  const { UUID } = useUserStore()

  const isHost = !!players.find(player => player.host && player.UUID === UUID)

  const startGameClickHandler = () => {
    startGame()
    navigate(ROUTES.KEYWORD)
  }

  return (
    <>
      <PlayerListCard />
      <div className='flex flex-col sm:gap-4'>
        <GameSettingListCard isHost={isHost} />
        {isHost ? (
          <Button className='flex grow-1' onClick={startGameClickHandler}>
            <h1>{t('Start Game')}</h1>
          </Button>
        ) : (
          <Card className='justify-center'>
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
