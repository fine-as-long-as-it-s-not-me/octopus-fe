import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/routes/ROUTES'
import {
  type Message,
  type Phase,
  type Player,
  type Score,
  type Setting,
  type Stroke,
} from '@/types'
import { getRoomSocketUrl } from '@/utils/socket'

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
const mockScores: Score[] = mockPlayers.map((player, index) => ({
  player,
  delta: (index + 1) * 10,
  total: 1000 - (index + 1) * 30,
}))
const mockStrokes: Stroke[] = [
  {
    id: 1,
    sequence: 0,
    type: 'pen',
    color: '#ff0000',
    strokeWidth: 5,
    points: [
      { x: 100, y: 100 },
      { x: 150, y: 150 },
      { x: 200, y: 100 },
    ],
  },
  {
    id: 1,
    sequence: 1,
    type: 'pen',
    color: '#00ff00',
    strokeWidth: 10,
    points: [
      { x: 300, y: 300 },
      { x: 350, y: 350 },
      { x: 400, y: 300 },
    ],
  },
]

export function useRoomSocket(code: string) {
  const socketRef = useRef<WebSocket | null>(null)
  const [round, setRound] = useState<number>(0)
  const [phase, setPhase] = useState<Phase>('waiting')
  const [roomCode, setRoomCode] = useState<string>(code)
  const [strokes, setStrokes] = useState<Stroke[]>(mockStrokes)
  const [setting] = useState<Setting>(mockSetting)
  const [timeLeft] = useState<number>(0)
  const [players] = useState<Player[]>(mockPlayers)
  const [bgColor] = useState<string>('#ffffff')
  const [scores] = useState<Score[]>(mockScores)
  const [keyword] = useState<string>('Fish')
  const [paintingPlayerId] = useState<string>('1')

  const navigate = useNavigate()

  // for dev test
  const addStroke = (stroke: Stroke) => {
    setStrokes(prevStrokes => [...prevStrokes, stroke])
  }

  const joinRoom = (roomCode: string, name: string) => {
    if (!socketRef.current) return
    socketRef.current.send(
      JSON.stringify({
        mainType: 'room',
        subType: 'join',
        data: { roomCode, name },
      }),
    )
  }

  useEffect(() => {
    const handlers = {
      welcome: ({ roomCode }: { roomCode: string }) => {
        setRoomCode(roomCode)
        navigate(ROUTES.ROOM(roomCode))
      },
    }

    if (!roomCode) return
    const socket = new WebSocket(getRoomSocketUrl())
    socketRef.current = socket

    const messageHandler = (event: MessageEvent) => {
      try {
        const { type, data } = JSON.parse(event.data) as Message
        handlers[type](data)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    socket.addEventListener('message', messageHandler)

    return () => {
      socket.removeEventListener('message', messageHandler)
      socket.close()
      socketRef.current = null
    }
  }, [roomCode])

  return {
    keyword,
    scores,
    strokes,
    bgColor,
    socketRef,
    round,
    setting,
    timeLeft,
    phase,
    players,
    paintingPlayerId,
    roomCode,
    setRoomCode,
    setPhase,
    setRound,
    addStroke,
    joinRoom,
  }
}
