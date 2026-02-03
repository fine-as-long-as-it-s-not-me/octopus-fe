import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useLeaveRoom } from '@/apis/room'
import { useBackground } from '@/context/BackgroundContext'
import { useWindow } from '@/context/WindowContext'
import { useRoomStore } from '@/store/roomStore'

export default function GameRoomLayout() {
  const { mutate: leaveRoom } = useLeaveRoom()
  const { roomCode, flush } = useRoomStore()

  const { setBackgroundImage } = useBackground()
  const { setIsCompact } = useWindow()

  useEffect(() => {
    setBackgroundImage('room')
    setIsCompact(true)
  }, [setBackgroundImage, setIsCompact])

  useEffect(() => {
    return () => {
      leaveRoom({ roomCode })
      flush()
    }
  }, [leaveRoom, roomCode, flush])
  return <Outlet />
}
