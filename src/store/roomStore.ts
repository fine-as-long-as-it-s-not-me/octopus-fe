import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DEFAULT_SETTINGS } from '@/consts'
import type { Chat, Player, Settings } from '@/types'

interface RoomState {
  roomCode: string
  setRoomCode: (roomCode: string) => void

  settings: Settings
  setSettings: (settings: Settings) => void

  customWords: { keyword: string; voteCount: number }[]
  setCustomWords: (
    customWords: { keyword: string; voteCount: number }[],
  ) => void

  players: Player[]
  setPlayers: (players: Player[]) => void

  hostUUID: string | null
  setHostUUID: (hostUUID: string | null) => void

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

      settings: DEFAULT_SETTINGS,
      setSettings: (settings: Settings) => set({ settings }),

      customWords: [],
      setCustomWords: (customWords: { keyword: string; voteCount: number }[]) =>
        set({ customWords }),

      players: [],
      setPlayers: (players: Player[]) => set({ players }),

      chats: [],
      setChats: (chats: Chat[]) => set({ chats }),
      addChat: (chat: Chat) =>
        set(state => ({
          chats: [...state.chats, chat],
        })),

      hostUUID: null,
      setHostUUID: (hostUUID: string | null) => set({ hostUUID }),

      flush: () =>
        set({
          roomCode: '',
          players: [],
          chats: [],
          customWords: [],
          hostUUID: null,
        }),
    }),
    {
      name: 'room-storage',
    },
  ),
)
