import { create } from 'zustand'

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

export const useRoomStore = create<RoomState>()(set => ({
  roomCode: '',
  setRoomCode: (roomCode: string) => set({ roomCode }),
  setting: mockSetting,
  setSetting: (setting: Setting) => set({ setting }),
  players: mockPlayers,
  setPlayers: (players: Player[]) => set({ players }),
}))
