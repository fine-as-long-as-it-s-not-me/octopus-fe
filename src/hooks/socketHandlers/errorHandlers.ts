import type { NavigateFunction } from 'react-router-dom'

import { ERRORS } from '@/consts'
import { ROUTES } from '@/routes/ROUTES'
import type { MessageHandlers } from '@/types'

type ErrorHandlersDeps = {
  toast: (message: string) => void
  setUsername: (name: string) => void
  navigate: NavigateFunction
}

export const createErrorHandlers = ({
  toast,
  setUsername,
  navigate,
}: ErrorHandlersDeps): Pick<MessageHandlers, 'error'> => ({
  error: ({ message, cause }) => {
    toast(message)
    switch (cause) {
      case ERRORS.PLAYER_UNREGISTERED:
        setUsername('')
        break
      case ERRORS.ROOM_NOT_FOUND:
        navigate(ROUTES.LOBBY)
        break
    }
  },
})
