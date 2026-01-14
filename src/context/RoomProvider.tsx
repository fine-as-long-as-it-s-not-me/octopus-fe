import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useMatch, useNavigate } from 'react-router-dom'
import { useModal } from 'sam-react-modal'

import Button from '@/components/common/Button'
import Icon from '@/components/common/Icon'
import Confirm from '@/components/modals/Confirm'
import { ROUTES } from '@/routes/ROUTES'
import type { Phase, Player, Setting } from '@/types'
import { RoomContext } from './RoomContext'

export default function RoomProvider({ children }: { children: ReactNode }) {
  const [roomCode, setRoomCode] = useState<string>('ABCD1234')
  const [players, setPlayers] = useState<Player[]>([])
  const [phase, setPhase] = useState<Phase>('waiting')
  const [phaseDescription] = useState<string>('Waiting for players...')
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [round, setRound] = useState<number>(0)
  const [setting] = useState<Setting>({
    rounds: 3,
    maxPlayers: 8,
    liars: 1,
    drawingTime: 60,
    customWords: true,
    roomType: 'public',
  })

  const { t } = useTranslation()
  const { openModal } = useModal()
  const navigate = useNavigate()

  const isRoomPage = useMatch(ROUTES.ROOM(roomCode))
  const isCustomWordPage = useMatch(ROUTES.CUSTOM_WORD(roomCode))
  const isGamePage = useMatch(ROUTES.GAME(`${roomCode}/*`))

  const startGame = () => {
    setPhase('keyword')
    setTimeLeft(60)
    setRound(1)
  }

  function CloseButton() {
    if (isRoomPage || isGamePage)
      return (
        <Button
          cardClassName='py-2 md:py-3'
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
    return <p>close</p>
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
        setPlayers,
        setRoomCode,
        startGame,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
