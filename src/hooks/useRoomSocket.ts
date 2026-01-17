import { useEffect, useRef, useState } from 'react'

import {
  type Phase,
  type Player,
  type Score,
  type Setting,
  type Stroke,
} from '@/types'
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
const mockScores: Score[] = mockPlayers.map((player, index) => ({
  player,
  delta: (index + 1) * 10,
  total: 1000 - (index + 1) * 30,
}))
const mockStrokes: Stroke[] = [
  {
    id: '1',
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
    id: '1',
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
  const [setting, setSetting] = useState<Setting>(mockSetting)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [phase, setPhase] = useState<Phase>('waiting')
  const [players, setPlayers] = useState<Player[]>(mockPlayers)
  const [roomCode, setRoomCode] = useState<string>(code)
  const [strokes, setStrokes] = useState<Stroke[]>(mockStrokes)
  const [bgColor, setBgColor] = useState<string>('#ffffff')
  const [scores, setScores] = useState<Score[]>(mockScores)
  const [keyword, setKeyword] = useState<string>('Fish')
  const [paintingPlayerId, setPaintingPlayerId] = useState<number>('1')

  useEffect(() => {
    if (!roomCode) return
    const socket = new WebSocket(getRoomSocketUrl(roomCode))
    socketRef.current = socket

    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return
      const message = parseRoomSocketMessage(event.data)
      if (!message) return

      console.log('Received message:', message)
    }

    socket.addEventListener('message', handleMessage)

    return () => {
      socket.removeEventListener('message', handleMessage)
      socket.close()
      socketRef.current = null
    }
  }, [roomCode])

  // for dev test
  const addStroke = (stroke: Stroke) => {
    setStrokes(prevStrokes => [...prevStrokes, stroke])
  }

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
  }
}
