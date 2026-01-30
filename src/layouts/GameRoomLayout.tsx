import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useLeaveRoom } from '@/apis/room'
import { useRoomStore } from '@/store/roomStore'

export default function GameRoomLayout() {
  const { mutate: leaveRoom } = useLeaveRoom()
  const { roomCode, flush } = useRoomStore()

  useEffect(() => {
    return () => {
      leaveRoom({ roomCode })
      flush()
    }
  }, [leaveRoom, roomCode, flush])
  return <Outlet />
}
