import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useSocket } from '@/context/SocketContext'

export default function GameRoomLayout() {
  const { leaveRoom } = useSocket()

  useEffect(() => {
    return () => {
      leaveRoom()
    }
  }, [leaveRoom])
  return <Outlet />
}
