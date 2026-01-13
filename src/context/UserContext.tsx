import { createContext, useContext } from 'react'

type UserContextType = {
  name: string
  id: string
  setName: React.Dispatch<React.SetStateAction<string>>
  setId: React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
