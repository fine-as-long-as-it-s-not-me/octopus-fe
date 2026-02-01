import { useEffect } from 'react'
import { matchPath, type useLocation, type useNavigate } from 'react-router-dom'

import { getPhasePath } from '@/lib/getPhasePath'
import { ROUTES } from '@/routes/ROUTES'
import type { Phase } from '@/types'

export default function useRouteByPhase({
  phase,
  roomCode,
  userId,
  userName,
  location,
  navigate,
}: {
  phase: Phase
  roomCode: string | null
  userId: number
  userName: string | null
  location: ReturnType<typeof useLocation>
  navigate: ReturnType<typeof useNavigate>
}) {
  useEffect(() => {
    if (userId === -1 || !userName) navigate(ROUTES.HOME)
    else {
      if (roomCode) {
        const nextPath = getPhasePath(phase)
        console.log(ROUTES.TEST, nextPath)
        if (
          !(
            matchPath(ROUTES.CUSTOM_WORD, location.pathname) &&
            nextPath === ROUTES.ROOM
          )
        ) {
          navigate(nextPath)
        }
      } else navigate(ROUTES.LOBBY)
    }
  }, [phase, roomCode, navigate, userId, userName, location.pathname])
}
