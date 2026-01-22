import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  name: string
  UUID: string
  setName: (name: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      name: '',
      UUID: crypto.randomUUID(),
      setName: (name: string) => set({ name }),
    }),
    {
      name: 'user-storage', // unique name
    },
  ),
)
