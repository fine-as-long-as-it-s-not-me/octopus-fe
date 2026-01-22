import { useEffect, useState } from 'react'

import { useRoomSocket } from '@/hooks/useRoomSocket'
import { useGameStore } from '@/store/gameStore'
import type { ErrorType } from '@/types'
import { SocketContext } from './SocketContext'

interface Props {
  children: React.ReactNode
}

export default function SocketProvider({ children }: Props) {
  const [error, setError] = useState<null | ErrorType>(null)
  const { phase, round, setPhase, setRound } = useGameStore()

  const {
    addStroke,
    joinRoom,
    joinRandomRoom,
    leaveRoom,
    reconnect,
    isConnecting,
  } = useRoomSocket(setError)

  // for dev
  const startGame = () => {
    setPhase('keyword')
    setRound(1)
  }

  // for dev
  const nextPhase = () => {
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

  useEffect(() => {
    if (error && !isConnecting) {
      const interval = setInterval(reconnect, 1000)

      return () => clearInterval(interval)
    }
  }, [error, isConnecting, reconnect, setError])

  return (
    <SocketContext.Provider
      value={{
        startGame,
        nextPhase,
        addStroke,
        joinRoom,
        joinRandomRoom,
        leaveRoom,
        setError,
      }}
    >
      {children}

      {error && (
        <div className='absolute inset-0 z-1000 flex flex-col items-center justify-center gap-4 bg-black/75 text-white'>
          <p className='text-red-400'>ERROR</p>
          <p>[{error.message}]</p>
          <p>Reconnecting to server...</p>
          <span className='loader' />
        </div>
      )}
    </SocketContext.Provider>
  )
}
