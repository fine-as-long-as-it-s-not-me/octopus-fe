import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import ChatCard from '@/components/chat/ChatCard'
import Button from '@/components/common/Button'
import GameSettingListCard from '@/components/game/GameSettingListCard'
import PlayerListCard from '@/components/player/PlayerListCard'
import { useRoom } from '@/context/RoomContext'

export default function RoomPage() {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const { roomCode, startGame } = useRoom()

  const startGameClickHandler = () => {
    startGame()
    navigate(`/room/${roomCode}/keyword`)
  }

  return (
    <>
      <PlayerListCard />
      <div className='flex flex-col sm:gap-4'>
        <GameSettingListCard />
        <Button className='flex grow-1' onClick={startGameClickHandler}>
          <h1>{t('Start Game')}</h1>
        </Button>
      </div>
      <ChatCard />
    </>
  )
}
