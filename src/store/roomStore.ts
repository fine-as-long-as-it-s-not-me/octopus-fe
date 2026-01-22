import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Player, Setting } from '@/types'

interface RoomState {
  roomCode: string
  setRoomCode: (roomCode: string) => void
  setting: Setting
  setSetting: (setting: Setting) => void
  players: Player[]
  setPlayers: (players: Player[]) => void
}

export const useRoomStore = create<RoomState>()(
  persist(
    set => ({
      roomCode: '',
      setRoomCode: (roomCode: string) => set({ roomCode }),
      setting: mockSetting,
      setSetting: (setting: Setting) => set({ setting }),
      players: mockPlayers,
      setPlayers: (players: Player[]) => set({ players }),
    }),
    {
      name: 'room-storage', // unique name
    },
  ),
)

export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Player 1',
    host: true,
    drawing: true,
    nextDrawer: false,
  },
  {
    id: '2',
    name: 'Player 2',
    host: false,
    drawing: false,
    nextDrawer: false,
  },
  {
    id: '3',
    name: 'Player 3',
    host: false,
    drawing: false,
    nextDrawer: true,
  },
]
const mockSetting: Setting = {
  customWords: true,
  rounds: 3,
  drawingTime: 60,
  maxPlayers: 8,
  liars: 2,
  roomType: 'public',
}
