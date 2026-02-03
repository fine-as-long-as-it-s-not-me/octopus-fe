import { useEffect } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'

import { getPhasePath } from '@/lib/getPhasePath'
import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'
import { useRoundStore } from '@/store/roundStore'
import { useUserStore } from '@/store/userStore'

const bypassPaths = [ROUTES.GUEST_ROOM, ROUTES.KEYWORD_REGISTER]

export default function useRouteByPhase() {
  const { phase } = useRoundStore()
  const { roomCode } = useRoomStore()
  const { id: userId, name: userName } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (bypassPaths.some(path => matchPath(path, location.pathname))) return

    if (userId === -1 || !userName) navigate(ROUTES.HOME)
    else {
      if (roomCode) {
        const nextPath = getPhasePath(phase)
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
