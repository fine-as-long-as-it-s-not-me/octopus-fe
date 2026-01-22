import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Player, Setting } from '@/types'
import { mockPlayers, mockSetting } from './mocks'

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
