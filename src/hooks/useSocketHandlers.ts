import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'
import type { PlayersUpdatedData, WelcomeData } from '@/types'

export function useSocketHandlers() {
  const { setRoomCode, setPlayers } = useRoomStore()
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
    }),
    [setRoomCode, setPlayers, navigate],
  )

  return handlers
}
