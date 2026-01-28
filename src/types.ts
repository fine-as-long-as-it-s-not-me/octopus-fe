import type { Language } from './i18n'

export interface Player {
  UUID: string
  name: string
  photoUrl?: string
  host?: boolean
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
} as const

export type Phase = (typeof Phase)[keyof typeof Phase]

export interface Settings {
  rounds: number
  maxPlayers: number
  octopusAmount: number
  drawingTime: number
  useCustomWord: boolean
  isCustomWordVoteOpen: boolean
  customWordMinVotes: number
  isPublic: boolean
  lang: Language
}

export type ChangeableSettings = Omit<
  Settings,
  'lang' | 'isCustomWordVoteOpen' | 'customWordMinVotes' | 'octopusAmount'
>

export interface Stroke {
  id: number
  sequence: number
  tool: ToolType
  color: string
  strokeWidth: number
  points: Point[]
}

export type ToolType = 'pen' | 'eraser'

export interface Point {
  x: number
  y: number
}

export interface Score {
  player: Player
  delta: number
  total: number
}

export type Chat = {
  player: Player
  text: string
}

// --------------------------------- Socket Messages ---------------------------------

export type MessageHandlers = {
  [K in Message['type']]: (data: Extract<Message, { type: K }>['data']) => void
}

export type Message =
  | { type: 'player_logged_in'; data: PlayerLoggedInResponse }
  | { type: 'welcome'; data: WelcomeResponse }
  | { type: 'players_updated'; data: PlayersUpdatedResponse }
  | { type: 'settings_updated'; data: SettingsUpdatedResponse }
  | { type: 'tick'; data: TickResponse }
  | { type: 'painter'; data: PainterResponse }
  | { type: 'canvas_updated'; data: CanvasUpdatedResponse }
  | { type: 'round_updated'; data: RoundResponse }
  | { type: 'keyword'; data: KeywordResponse }
  | { type: 'chat_added'; data: ChatResponse }
  | { type: 'system_chat'; data: SystemChatResponse }

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

export type PainterResponse = {
  UUID: string
  nextUUID: string
}

export type RoundResponse = { round: number }

export type KeywordResponse = {
  keyword: string
}

export type ChatResponse = Chat

type SystemChatVariable =
  | { name: string } // for player_joined, player_left, player_voted
  | { name: string; amount: number } // for discussion_time_changed
  | { voterName: string }

export type SystemChatResponse = {
  type:
    | 'player_joined'
    | 'player_left'
    | 'discussion_time_changed'
    | 'player_voted'
    | 'revote'
  variable: SystemChatVariable
}

export type VoteResultResponse = {
  voteResult: [string, number][]
}
