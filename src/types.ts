export interface Player {
  id: string
  name: string
  photoUrl?: string
  host?: boolean
  drawing?: boolean
  nextDrawer?: boolean
}

export interface Keyword {
  id: string
  word: string
  votes: number
}

export type Phase =
  | 'waiting'
  | 'keyword'
  | 'drawing'
  | 'discussion'
  | 'voting'
  | 'vote-result'
  | 'result'
  | 'guessing'

export interface Setting {
  rounds: number
  maxPlayers: number
  liars: number
  drawingTime: number
  customWords: boolean
  roomType: 'public' | 'private'
}

export interface Vector {
  id: string
  type: 'pen' | 'eraser'
  color: string
  strokeWidth: number
  points: number[] // for freehand: [x1, y1, x2, y2, ...], for others: [x, y, w, h]
}

export interface Score {
  player: Player
  delta: number
  total: number
}
