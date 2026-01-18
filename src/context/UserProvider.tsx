import { useState } from 'react'

import { getRandomName } from '@/utils/name'
import { UserContext } from './UserContext'

interface Props {
  children: React.ReactNode
}

export default function UserProvider({ children }: Props) {
  const [name, setName] = useState(
    localStorage.getItem('name') || getRandomName(),
  )
  const [id, setId] = useState('1')
  return (
    <UserContext.Provider value={{ name, id, setName, setId }}>
      {children}
    </UserContext.Provider>
  )
}
