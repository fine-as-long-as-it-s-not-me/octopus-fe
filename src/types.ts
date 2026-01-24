import type { Languages } from './i18n'

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
  isVoteOpen: boolean
  isPublic: boolean
  language: Languages
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
  type: 'welcome' | 'players_updated'
  data: WelcomeData & PlayersUpdatedData
}
export type WelcomeData = {
  roomCode: string
}
export type PlayersUpdatedData = {
  hostUUID: string
  players: Player[]
}
export type ErrorType = {
  message: string
  code?: string
  error?: unknown
}

export type PlayerLoggedInData = {
  roomCode?: string
}
