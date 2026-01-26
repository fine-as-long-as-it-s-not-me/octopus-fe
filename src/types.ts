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

export const Phase = {
  OUT: 'out',
  KEYWORD: 'keyword',
  DRAWING: 'drawing',
  DISCUSSION: 'discussion',
  VOTING: 'voting',
  VOTE_RESULT: 'vote-result',
  RESULT: 'result',
  GUESSING: 'guessing',
}

export type Phase = (typeof Phase)[keyof typeof Phase]

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
  tool: 'pen' | 'eraser'
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
  roomCode: string
  id: number
}

export type SettingsUpdatedResponse = {
  settings: Settings
}

export type TickResponse = {
  round: number
  phase: Phase
  timeLeft: number
}

export type CanvasUpdatedResponse = {
  strokes: Stroke[]
  bgColor: string
}

export type PainterResponse = { UUID: string }

export type RoundResponse = { round: number }
