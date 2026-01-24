import type { Language } from './i18n'

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

export interface Settings {
  rounds: number
  maxPlayers: number
  liars: number
  drawingTime: number
  useCustomWord: boolean
  isCustomWordVoteOpen: boolean
  customWordMinVotes: number
  isPublic: boolean
  lang: Language
}

export type ChangeableSettings = Omit<
  Settings,
  'lang' | 'isCustomWordVoteOpen' | 'customWordMinVotes' | 'liars'
>

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
  type: 'welcome' | 'players_updated' | 'settings_updated' | 'hello'
  data: WelcomeResponse &
    PlayersUpdatedResponse &
    SettingsUpdatedResponse &
    PlayerLoggedInResponse
}
export type WelcomeResponse = {
  roomCode: string
}
export type PlayersUpdatedResponse = {
  hostUUID: string
  players: Player[]
}
export type ErrorType = {
  message: string
  code?: string
  error?: unknown
}

export type PlayerLoggedInResponse = {
  roomCode?: string
}

export type SettingsUpdatedResponse = {
  settings: Settings
}
