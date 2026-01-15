import { useMemo, useState, type ReactNode } from 'react'

import { useRoomSocket } from '@/hooks/useRoomSocket'
import { RoomContext } from './RoomContext'

export default function RoomProvider({ children }: { children: ReactNode }) {
  const [roomCode, setRoomCode] = useState<string>('A234')
  const { round, setting, timeLeft, phase, players, setPhase, setRound } =
    useRoomSocket(roomCode)
  const phaseDescription = useMemo(() => {
    switch (phase) {
      case 'waiting':
        return 'Waiting for players...'
      case 'keyword':
        return 'Check your given word'
      case 'drawing':
        return 'Draw the word as best as you can'
      case 'discussion':
        return 'Discuss with other players'
      case 'voting':
        return 'Vote for the suspicious drawing'
      case 'vote-result':
        return 'See the voting results'
      case 'guessing':
        return 'Guess the correct word'
      case 'result':
        return 'See the round results'
      default:
        return ''
    }
  }, [phase])

  const startGame = () => {
    setPhase('keyword')
    setRound(1)
  }

  const nextPhase = () => {
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
      setRound(prev => prev + 1)
    }
    if (phases[nextIndex] === 'waiting') {
      setRound(0)
    }
  }

  return (
    <RoomContext.Provider
      value={{
        roomCode,
        players,
        phase,
        phaseDescription,
        timeLeft,
        round,
        setting,
        setRoomCode,
        startGame,
        nextPhase, // for dev
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
