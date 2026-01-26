import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSocketConnection } from '@/hooks/useSocketConnection'
import { getPhasePath } from '@/lib/getPhasePath'
import { ROUTES } from '@/routes/ROUTES'
import { useGameStore } from '@/store/gameStore'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'
import type { ErrorType } from '@/types'
import { SocketContext } from './SocketContext'

interface Props {
  children: React.ReactNode
}

export default function SocketProvider({ children }: Props) {
  const [error, setError] = useState<null | ErrorType>(null)
  const { phase, round, setPhase, setRound } = useGameStore()
  const { roomCode } = useRoomStore()
  const { id: userId, name: userName } = useUserStore()
  const navigate = useNavigate()

  const { connectSocket, isConnected, isConnecting, sendMessage } =
    useSocketConnection(setError)

  useEffect(() => {
    if ((error || !isConnected) && !isConnecting) {
      const interval = setInterval(connectSocket, 1000)

      return () => clearInterval(interval)
    }
  }, [error, isConnected, isConnecting, connectSocket, setError])

  useEffect(() => {
    if (userId == -1 || !userName) navigate(ROUTES.HOME)
    else {
      if (roomCode) navigate(getPhasePath(phase))
      else navigate(ROUTES.LOBBY)
    }
  }, [phase, roomCode, navigate, userId, userName])

  const DEV_nextPhase = () => {
    // for dev
    const phases = [
      'waiting',
      'keyword',
      'drawing',
      'discussion',
      'voting',
      'vote-result',
      'guessing',
      'result',
    ]
    const currentIndex = phases.indexOf(phase)
    const nextIndex = (currentIndex + 1) % phases.length
    setPhase(phases[nextIndex] as typeof phase)
    if (phases[nextIndex] === 'keyword') {
      setRound(round + 1)
    }
    if (phases[nextIndex] === 'waiting') {
      setRound(0)
    }
  }

  return (
    <SocketContext.Provider
      value={{
        DEV_nextPhase,
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
