export interface Player {
  UUID: string
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

export type WelcomeData = {
  roomCode: string
}
export type PlayersUpdatedData = {
  hostUUID: string
  players: Player[]
}

export type Message =
  | {
      type: 'welcome'
      data: WelcomeData
    }
  | {
      type: 'players_updated'
      data: PlayersUpdatedData
    }
export type ErrorType = {
  message: string
  code?: string
  error?: unknown
}
