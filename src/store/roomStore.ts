import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Chat, Player, Settings } from '@/types'
import { mockPlayers, mockSetting } from './mocks'

interface RoomState {
  roomCode: string
  setRoomCode: (roomCode: string) => void

  settings: Settings
  setSettings: (settings: Settings) => void

  players: Player[]
  setPlayers: (players: Player[]) => void

  chats: Chat[]
  setChats: (chats: Chat[]) => void
  addChat: (chat: Chat) => void

  flush: () => void
}

export const useRoomStore = create<RoomState>()(
  persist(
    set => ({
      roomCode: '',
      setRoomCode: (roomCode: string) => set({ roomCode }),

      settings: mockSetting,
      setSettings: (settings: Settings) => set({ settings }),

      players: mockPlayers,
      setPlayers: (players: Player[]) => set({ players }),

      chats: [],
      setChats: (chats: Chat[]) => set({ chats }),
      addChat: (chat: Chat) =>
        set(state => ({
          chats: [...state.chats, chat],
        })),

      flush: () => set({ roomCode: '', players: [], chats: [] }),
    }),
    {
      name: 'room-storage',
    },
  ),
)
