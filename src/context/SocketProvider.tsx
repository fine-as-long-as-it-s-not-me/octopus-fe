import { useEffect, useState } from 'react'

import { useSocketConnection } from '@/hooks/useSocketConnection'
import { useGameStore } from '@/store/gameStore'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'
import type { ChangableSettings, ErrorType, Stroke } from '@/types'
import { SocketContext } from './SocketContext'

interface Props {
  children: React.ReactNode
}

export default function SocketProvider({ children }: Props) {
  const [error, setError] = useState<null | ErrorType>(null)
  const { strokes, setStrokes, phase, round, setPhase, setRound } =
    useGameStore()
  const { roomCode, setRoomCode } = useRoomStore()
  const { name, UUID } = useUserStore()

  const { connectSocket, isConnected, isConnecting, sendMessage } =
    useSocketConnection(setError)

  useEffect(() => {
    if ((error || !isConnected) && !isConnecting) {
      const interval = setInterval(connectSocket, 1000)

      return () => clearInterval(interval)
    }
  }, [error, isConnected, isConnecting, connectSocket, setError])

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

  const startGame = () => {
    setPhase('keyword')
    setRound(1)
  }

  const addStroke = (stroke: Stroke) => {
    setStrokes([...strokes, stroke])
  }

  const createRoom = (settings: ChangableSettings) => {
    sendMessage('room', 'create', { settings })
  }

  const changeSettings = (settings: ChangableSettings) => {
    sendMessage('room', 'change_settings', { roomCode, settings })
  }

  const joinRoom = (roomCode: string) => {
    sendMessage('room', 'join', { roomCode, name, UUID })
  }

  const joinRandomRoom = () => {
    sendMessage('room', 'join_random', { name, UUID })
  }

  const leaveRoom = () => {
    sendMessage('room', 'leave', { roomCode })
    setRoomCode('')
  }

  const login = () => {
    sendMessage('player', 'login', { name, UUID })
  }

  return (
    <SocketContext.Provider
      value={{
        startGame,
        DEV_nextPhase,
        addStroke,
        createRoom,
        joinRoom,
        joinRandomRoom,
        leaveRoom,
        setError,
        changeSettings,
        login,
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
