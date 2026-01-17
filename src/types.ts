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

export interface Stroke {
  id: number
  sequence: number
  type: 'pen' | 'eraser'
  color: string
  strokeWidth: number
  points: Point[]
}

export interface Point {
  x: number
  y: number
}

export interface Score {
  player: Player
  delta: number
  total: number
}

export interface Message {
  type: MessageType
  data: DataType
}

export type MessageType = 'welcome'

export type DataType = { roomCode: string }
