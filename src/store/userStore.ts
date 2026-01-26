import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  id: number
  name: string
  UUID: string
  setId: (id: number) => void
  setName: (name: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      id: -1,
      name: '',
      UUID: crypto.randomUUID(),
      setId: (id: number) => set({ id }),
      setName: (name: string) => set({ name }),
    }),
    {
      name: 'user-storage', // unique name
    },
  ),
)
