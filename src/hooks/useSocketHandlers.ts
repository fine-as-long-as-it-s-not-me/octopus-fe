import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'
import type {
  PlayerLoggedInResponse,
  PlayersUpdatedResponse,
  SettingsUpdatedResponse,
  WelcomeResponse,
} from '@/types'

export function useSocketHandlers(
  sendMessage: (
    mainType: string,
    subType: string,
    data?: Record<string, unknown>,
  ) => void,
) {
  const { setRoomCode, setPlayers, setSettings } = useRoomStore()
  const { name, UUID } = useUserStore()
  const navigate = useNavigate()

  const handlers = useMemo(
    () => ({
      settings_updated: ({ settings }: SettingsUpdatedResponse) => {
        setSettings(settings)
      },
      welcome: ({ roomCode }: WelcomeResponse) => {
        setRoomCode(roomCode)
        navigate(ROUTES.WAITING)
      },
      players_updated: ({ hostUUID, players }: PlayersUpdatedResponse) => {
        // Update players state here
        setPlayers(
          players.map(player => ({
            ...player,
            host: player.UUID === hostUUID,
          })),
        )
      },
      hello: ({ roomCode }: PlayerLoggedInResponse) => {
        if (roomCode) {
          sendMessage('room', 'join', { roomCode, name, UUID })
        }
      },
    }),
    [setRoomCode, setPlayers, setSettings, navigate, sendMessage, name, UUID],
  )

  return handlers
}
