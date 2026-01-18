import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useRoom } from '@/context/RoomContext'

export default function GameRoomLayout() {
  const { leaveRoom } = useRoom()

  useEffect(() => {
    return () => {
      leaveRoom()
    }
  }, [])
  return <Outlet />
}
