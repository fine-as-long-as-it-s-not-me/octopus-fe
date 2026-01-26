import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useLeaveRoom } from '@/apis/room'
import { useRoomStore } from '@/store/roomStore'

export default function GameRoomLayout() {
  const { mutate: leaveRoom } = useLeaveRoom()
  const { flush } = useRoomStore()

  useEffect(() => {
    return () => {
      flush()
      leaveRoom()
    }
  }, [leaveRoom, flush])
  return <Outlet />
}
