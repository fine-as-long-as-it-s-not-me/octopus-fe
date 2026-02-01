import { useEffect, useState } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'

import { useSocketConnection } from '@/hooks/useSocketConnection'
import { getPhasePath } from '@/lib/getPhasePath'
import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'
import { useRoundStore } from '@/store/roundStore'
import { useUserStore } from '@/store/userStore'
import { type ErrorType } from '@/types'
import { SocketContext } from './SocketContext'

interface Props {
  children: React.ReactNode
}

export default function SocketProvider({ children }: Props) {
  const [error, setError] = useState<null | ErrorType>(null)
  const { phase } = useRoundStore()
  const { roomCode } = useRoomStore()
  const { id: userId, name: userName } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()

  const { connectSocket, isConnected, isConnecting, sendMessage } =
    useSocketConnection(setError)

  useEffect(() => {
    if ((error || !isConnected) && !isConnecting) {
      const interval = setInterval(connectSocket, 1000)

      return () => clearInterval(interval)
    }
  }, [error, isConnected, isConnecting, connectSocket, setError])

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

  return (
    <SocketContext.Provider
      value={{
        setError,
        sendMessage,
      }}
    >
      {children}

      {error && (
        <div className='absolute inset-0 z-1002 flex flex-col items-center justify-center gap-4 bg-black/75 text-white'>
          {/* <p className='text-red-400'>ERROR</p> */}
          <p>[{error.message}]</p>
          <p>Connecting to server...</p>
          <span className='loader' />
        </div>
      )}
    </SocketContext.Provider>
  )
}
