import { useEffect, useRef, useState } from 'react'

import type { Phase, Player, Setting } from '@/types'
import { getRoomSocketUrl, parseRoomSocketMessage } from '@/utils/roomSocket'

const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Player 1',
    host: true,
    drawing: true,
    nextDrawer: false,
  },
  {
    id: '2',
    name: 'Player 2',
    host: false,
    drawing: false,
    nextDrawer: false,
  },
  {
    id: '3',
    name: 'Player 3',
    host: false,
    drawing: false,
    nextDrawer: true,
  },
]
const mockSetting: Setting = {
  customWords: true,
  rounds: 3,
  drawingTime: 60,
  maxPlayers: 8,
  liars: 2,
  roomType: 'public',
}

export function useRoomSocket(code: string) {
  const socketRef = useRef<WebSocket | null>(null)
  const [round, setRound] = useState<number>(0)
  const [setting, setSetting] = useState<Setting>(mockSetting)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [phase, setPhase] = useState<Phase>('waiting')
  const [players, setPlayers] = useState<Player[]>(mockPlayers)
  const [roomCode, setRoomCode] = useState<string>(code)

  useEffect(() => {
    if (!roomCode) return
    const socket = new WebSocket(getRoomSocketUrl(roomCode))
    socketRef.current = socket

    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return
      const message = parseRoomSocketMessage(event.data)
      if (!message) return
      switch (message.type) {
        case 'room_state': {
          if (message.payload.roomCode) setRoomCode(message.payload.roomCode)
          if (message.payload.players) setPlayers(message.payload.players)
          if (message.payload.phase) setPhase(message.payload.phase)
          if (typeof message.payload.timeLeft === 'number')
            setTimeLeft(message.payload.timeLeft)
          if (typeof message.payload.round === 'number')
            setRound(message.payload.round)
          if (message.payload.setting) setSetting(message.payload.setting)
          return
        }
        case 'players_updated':
          setPlayers(message.payload.players)
          return
        case 'phase_updated':
          setPhase(message.payload.phase)
          if (typeof message.payload.timeLeft === 'number')
            setTimeLeft(message.payload.timeLeft)
          if (typeof message.payload.round === 'number')
            setRound(message.payload.round)
          return
        case 'setting_updated':
          setSetting(prev => ({ ...prev, ...(message.payload as Setting) }))
          return
        case 'room_code':
          setRoomCode(message.payload.roomCode)
          return
        default:
          return
      }
    }

    socket.addEventListener('message', handleMessage)

    return () => {
      socket.removeEventListener('message', handleMessage)
      socket.close()
      socketRef.current = null
    }
  }, [roomCode])

  return {
    socketRef,
    round,
    setting,
    timeLeft,
    phase,
    players,
    roomCode,
    setRoomCode,
  }
}
