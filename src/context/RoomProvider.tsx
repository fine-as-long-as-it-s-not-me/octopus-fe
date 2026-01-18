import { type ReactNode } from 'react'

import { useRoomSocket } from '@/hooks/useRoomSocket'
import { RoomContext } from './RoomContext'

export default function RoomProvider({ children }: { children: ReactNode }) {
  const {
    round,
    setting,
    timeLeft,
    phase,
    players,
    bgColor,
    strokes,
    scores,
    keyword,
    paintingPlayerId,
    roomCode,
    setPhase,
    setRound,
    addStroke,
    joinRoom,
    joinRandomRoom,
    leaveRoom,
  } = useRoomSocket()

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
      setRound(prev => prev + 1)
    }
    if (phases[nextIndex] === 'waiting') {
      setRound(0)
    }
  }

  return (
    <RoomContext.Provider
      value={{
        keyword,
        scores,
        bgColor,
        strokes,
        roomCode,
        players,
        phase,
        timeLeft,
        round,
        painterId: paintingPlayerId,
        setting,
        startGame,
        nextPhase, // for dev
        addStroke,
        joinRoom,
        joinRandomRoom,
        leaveRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
