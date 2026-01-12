import { useState, type ReactNode } from 'react'

import type { Player } from '@/types'
import { RoomContext } from './RoomContext'

export default function RoomProvider({ children }: { children: ReactNode }) {
  const [roomCode, setRoomCode] = useState<string>('')
  const [closeButton, setCloseButton] = useState<ReactNode>(null)
  const [players, setPlayers] = useState<Player[]>([])

  return (
    <RoomContext.Provider
      value={{
        roomCode,
        closeButton,
        players,
        setPlayers,
        setCloseButton,
        setRoomCode,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
