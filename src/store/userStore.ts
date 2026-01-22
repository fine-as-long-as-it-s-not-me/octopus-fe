import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  name: string
  id: string
  setName: (name: string) => void
  setId: (id: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      name: '',
      id: '',
      setName: (name: string) => set({ name }),
      setId: (id: string) => set({ id }),
    }),
    {
      name: 'user-storage', // unique name
    },
  ),
)
