import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useRouteByPhase from '@/hooks/useRouteByPhase'
import { useSocketConnection } from '@/hooks/useSocketConnection'
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

  useRouteByPhase({
    phase,
    roomCode,
    userId,
    userName,
    location,
    navigate,
  })

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
