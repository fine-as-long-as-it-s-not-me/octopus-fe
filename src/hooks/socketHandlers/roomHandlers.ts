import type {
  MessageHandlers,
  PlayersUpdatedResponse,
  SettingsUpdatedResponse,
} from '@/types'
import { Phase } from '@/types'

type RoomHandlersDeps = {
  name: string
  UUID: string
  sendMessage: (
    mainType: string,
    subType: string,
    data?: Record<string, unknown>,
  ) => void
  setId: (id: number) => void
  setRoomCode: (roomCode: string) => void
  setPlayers: (players: PlayersUpdatedResponse['players']) => void
  setSettings: (settings: SettingsUpdatedResponse['settings']) => void
  setPhase: (phase: Phase) => void
  setHostUUID: (hostUUID: string | null) => void
}

export const createRoomHandlers = ({
  name,
  UUID,
  sendMessage,
  setId,
  setRoomCode,
  setPlayers,
  setSettings,
  setPhase,
  setHostUUID,
}: RoomHandlersDeps): Pick<
  MessageHandlers,
  | 'player_logged_in'
  | 'welcome'
  | 'players_updated'
  | 'settings_updated'
  | 'kicked'
> => ({
  player_logged_in: ({ roomCode, id }) => {
    setId(id)
    setRoomCode(roomCode)

    if (roomCode) sendMessage('room', 'join', { roomCode, name, UUID })
    else setPhase(Phase.END)
  },
  welcome: ({ roomCode, phase }) => {
    setRoomCode(roomCode)
    setPhase(phase)
  },
  players_updated: ({ hostUUID, players }) => {
    setPlayers(players)
    setHostUUID(hostUUID)
  },
  settings_updated: ({ settings }) => {
    setSettings(settings)
  },
  kicked: () => {
    setPhase(Phase.END)
    setRoomCode('')
  },
})
