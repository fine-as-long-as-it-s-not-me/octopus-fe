import { useState } from 'react'

import { UserContext } from './UserContext'

interface Props {
  children: React.ReactNode
}

export default function UserProvider({ children }: Props) {
  const [name, setName] = useState('')
  const [id, setId] = useState('1')
  return (
    <UserContext.Provider value={{ name, id, setName, setId }}>
      {children}
    </UserContext.Provider>
  )
}
