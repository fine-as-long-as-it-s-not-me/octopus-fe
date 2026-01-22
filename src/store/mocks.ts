import type { Player, Score, Setting, Stroke } from '@/types'

export const mockPlayers: Player[] = [
  {
    UUID: '1',
    name: 'Player 1',
    host: true,
    drawing: true,
    nextDrawer: false,
  },
  {
    UUID: '2',
    name: 'Player 2',
    host: false,
    drawing: false,
    nextDrawer: false,
  },
  {
    UUID: '3',
    name: 'Player 3',
    host: false,
    drawing: false,
    nextDrawer: true,
  },
]
export const mockSetting: Setting = {
  customWords: true,
  rounds: 3,
  drawingTime: 60,
  maxPlayers: 8,
  liars: 2,
  roomType: 'public',
}

export const mockScores: Score[] = mockPlayers.map((player, index) => ({
  player,
  delta: (index + 1) * 10,
  total: 1000 - (index + 1) * 30,
}))
export const mockStrokes: Stroke[] = [
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
