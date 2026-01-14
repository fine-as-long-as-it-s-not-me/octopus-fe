import { useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useMatch, useNavigate } from 'react-router-dom'
import { useModal } from 'sam-react-modal'

import Button from '@/components/common/Button'
import Icon from '@/components/common/Icon'
import Confirm from '@/components/modals/Confirm'
import { useRoomSocket } from '@/hooks/useRoomSocket'
import { ROUTES } from '@/routes/ROUTES'
import { RoomContext } from './RoomContext'

export default function RoomProvider({ children }: { children: ReactNode }) {
  const [roomCode, setRoomCode] = useState<string>('A234')
  const { round, setting, timeLeft, phase, players } = useRoomSocket(roomCode)
  const phaseDescription = useMemo(() => {
    switch (phase) {
      case 'waiting':
        return 'Waiting for players...'
      case 'keyword':
        return 'Check your given word'
      case 'drawing':
        return 'Draw the word as best as you can'
      case 'discussion':
        return 'Discuss with other players'
      case 'voting':
        return 'Vote for the suspicious drawing'
      case 'vote-result':
        return 'See the voting results'
      case 'guessing':
        return 'Guess the correct word'
      case 'result':
        return 'See the round results'
      default:
        return ''
    }
  }, [phase])

  const { t } = useTranslation()
  const { openModal } = useModal()
  const navigate = useNavigate()

  const isRoomPage = useMatch(ROUTES.ROOM(':roomCode'))
  const isCustomWordPage = useMatch(ROUTES.CUSTOM_WORD(':roomCode'))
  const isGamePage = useMatch(ROUTES.GAME('*'))
  console.log({ isRoomPage, isCustomWordPage, isGamePage })

  const startGame = () => {}

  function CloseButton() {
    if (isCustomWordPage)
      return (
        <Button
          cardClassName='py-2 md:py-3'
          size='md'
          onClick={() => {
            navigate(ROUTES.ROOM(roomCode))
          }}
        >
          <Icon name='arrow_back' />
        </Button>
      )
    if (isRoomPage || isGamePage)
      return (
        <Button
          cardClassName='py-2 md:py-3 h-full'
          size='md'
          onClick={async () => {
            if (
              await openModal(
                <Confirm>
                  <p>{t('Are you sure you want to leave the room?')}</p>
                </Confirm>,
              )
            )
              navigate(ROUTES.LOBBY)
          }}
        >
          <Icon name='logout' />
        </Button>
      )
    return <p></p>
  }

  return (
    <RoomContext.Provider
      value={{
        roomCode,
        CloseButton,
        players,
        phase,
        phaseDescription,
        timeLeft,
        round,
        setting,
        setRoomCode,
        startGame,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
