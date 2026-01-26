import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Language } from '@/i18n'

interface UserState {
  id: number
  name: string
  UUID: string
  lang: Language
  setId: (id: number) => void
  setName: (name: string) => void
  setLang: (lang: Language) => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      id: -1,
      setId: (id: number) => set({ id }),

      UUID: crypto.randomUUID(),

      name: '',
      setName: (name: string) => set({ name }),

      lang: (window.navigator.language.split('-')[0] as Language) ?? 'en',
      setLang: (lang: Language) => set({ lang }),
    }),
    {
      name: 'user-storage', // unique name
    },
  ),
)
