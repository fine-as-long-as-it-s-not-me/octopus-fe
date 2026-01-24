import { create } from 'zustand'

import type { Player, Settings } from '@/types'
import { mockPlayers, mockSetting } from './mocks'

interface RoomState {
  roomCode: string
  setRoomCode: (roomCode: string) => void
  settings: Settings
  setSettings: (settings: Settings) => void
  players: Player[]
  setPlayers: (players: Player[]) => void
}

export const useRoomStore = create<RoomState>()(set => ({
  roomCode: '',
  setRoomCode: (roomCode: string) => set({ roomCode }),
  settings: mockSetting,
  setSettings: (settings: Settings) => set({ settings }),
  players: mockPlayers,
  setPlayers: (players: Player[]) => set({ players }),
}))
