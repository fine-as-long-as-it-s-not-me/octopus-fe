import { useState } from 'react'

import { SocketErrorBoundary } from '@/components/common/SocketErrorBoundary'
import { useRoomSocket } from '@/hooks/useRoomSocket'
import { useGameStore } from '@/store/gameStore'
import { SocketContext } from './SocketContext'

interface Props {
  children: React.ReactNode
}

export default function SocketProvider({ children }: Props) {
  const { phase, round, setPhase, setRound } = useGameStore()
  const [retryKey, setRetryKey] = useState(0)

  const { addStroke, joinRoom, joinRandomRoom, leaveRoom } = useRoomSocket()

  const handleRetry = () => {
    // Force re-mount of the component tree to retry socket connection
    // This ensures a clean state by re-initializing the WebSocket from scratch
    setRetryKey(prev => prev + 1)
  }

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
  return (
    <SocketErrorBoundary key={retryKey} onRetry={handleRetry}>
      <SocketContext.Provider
        value={{
          startGame,
          nextPhase,
          addStroke,
          joinRoom,
          joinRandomRoom,
          leaveRoom,
        }}
      >
        {children}
      </SocketContext.Provider>
    </SocketErrorBoundary>
  )
}
