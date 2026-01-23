import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'
import type {
  PlayerLoggedInData,
  PlayersUpdatedData,
  WelcomeData,
} from '@/types'

export function useSocketHandlers(
  sendMessage: (
    mainType: string,
    subType: string,
    data?: Record<string, unknown>,
  ) => void,
) {
  const { setRoomCode, setPlayers } = useRoomStore()
  const { name, UUID } = useUserStore()
  const navigate = useNavigate()

  const handlers = useMemo(
    () => ({
      welcome: ({ roomCode }: WelcomeData) => {
        setRoomCode(roomCode)
        navigate(ROUTES.WAITING)
      },
      players_updated: ({ hostUUID, players }: PlayersUpdatedData) => {
        // Update players state here
        setPlayers(
          players.map(player => ({
            ...player,
            host: player.UUID === hostUUID,
          })),
        )
      },
      hello: ({ roomCode }: PlayerLoggedInData) => {
        if (roomCode) {
          sendMessage('room', 'join', { roomCode, name, UUID })
        }
      },
    }),
    [setRoomCode, setPlayers, navigate, sendMessage, name, UUID],
  )

  return handlers
}
