import { Outlet } from 'react-router-dom'

import Card from '@/components/common/Card'

export default function GameLayout() {
  return (
    <>
      <Card>Game Layout</Card>
      <Outlet />
    </>
  )
}
