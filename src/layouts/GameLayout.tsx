import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Card from '@/components/common/Card'
import { useRoom } from '@/context/RoomContext'

export default function GameLayout() {
  const { setCloseButton } = useRoom()
  useEffect(() => {
    setCloseButton(null)
  })
  return (
    <>
      <Card>Game Layout</Card>
      <Outlet />
    </>
  )
}
