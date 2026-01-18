import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '@/context/UserContext'
import { ROUTES } from '@/routes/ROUTES'
import {
  type Message,
  type Phase,
  type Player,
  type PlayersUpdatedData,
  type Score,
  type Setting,
  type Stroke,
  type WelcomeData,
} from '@/types'
import { getRoomSocketUrl, sendMessage } from '@/utils/socket'

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

export function useRoomSocket() {
  const socketRef = useRef<WebSocket | null>(null)
  const [round, setRound] = useState<number>(0)
  const [phase, setPhase] = useState<Phase>('waiting')
  const [roomCode, setRoomCode] = useState<string | null>(null)
  const [strokes, setStrokes] = useState<Stroke[]>(mockStrokes)
  const [setting] = useState<Setting>(mockSetting)
  const [timeLeft] = useState<number>(0)
  const [players, setPlayers] = useState<Player[]>([])
  const [bgColor] = useState<string>('#ffffff')
  const [scores] = useState<Score[]>(mockScores)
  const [keyword] = useState<string>('Fish')
  const [paintingPlayerId] = useState<string>('1')

  const navigate = useNavigate()
  const { setId: setUserId } = useUser()

  // for dev test
  const addStroke = (stroke: Stroke) => {
    setStrokes(prevStrokes => [...prevStrokes, stroke])
  }

  const joinRoom = (roomCode: string, name: string) => {
    if (!socketRef.current) return
    sendMessage(socketRef.current, 'room', 'join', { roomCode, name })
  }

  const leaveRoom = () => {
    if (!socketRef.current) return
    sendMessage(socketRef.current, 'room', 'leave', { roomCode })
    setRoomCode(null)
    navigate(ROUTES.HOME)
  }

  useEffect(() => {
    const socket = new WebSocket(getRoomSocketUrl())
    socketRef.current = socket

    return () => {
      socket.close()
      socketRef.current = null
    }
  }, [])

  useEffect(() => {
    const socket = socketRef.current
    if (!socket) return

    const handlers = {
      welcome: ({ roomCode, userId }: WelcomeData) => {
        setUserId(userId)
        setRoomCode(roomCode)
        navigate(ROUTES.WAITING)
      },
      players_updated: ({ hostId, players }: PlayersUpdatedData) => {
        // Update players state here
        setPlayers(
          players.map(player => ({
            ...player,
            host: player.id === hostId,
          })),
        )
      },
    }

    const messageHandler = (event: MessageEvent) => {
      try {
        const { type, data } = JSON.parse(event.data) as Message
        console.log('Received message:', type, data)
        handlers[type](data)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    socket.addEventListener('message', messageHandler)
    socket.addEventListener('disconnect', () => {
      //retry connection
      console.warn('Socket disconnected, retrying connection...')

      const newSocket = new WebSocket(getRoomSocketUrl())
      socketRef.current = newSocket
    })

    return () => {
      socket.removeEventListener('message', messageHandler)
    }
  }, [navigate, setUserId])

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
    leaveRoom,
  }
}
