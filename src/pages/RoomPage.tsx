import { useTranslation } from 'react-i18next'

import { useStartGame } from '@/apis/game'
import ChatCard from '@/components/chat/ChatCard'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import GameSettingListCard from '@/components/game/GameSettingListCard'
import PlayerListCard from '@/components/player/PlayerListCard'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'

export default function RoomPage() {
  const { t } = useTranslation()

  const { mutate: startGame } = useStartGame()
  const { players } = useRoomStore()
  const { UUID } = useUserStore()

  const isHost = !!players.find(player => player.host && player.UUID === UUID)

  const startGameClickHandler = () => {
    startGame()
  }

  return (
    <>
      <PlayerListCard />
      <div className='flex grow-1 flex-col sm:gap-4'>
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
