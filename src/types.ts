import type { Language } from './i18n'

export interface Player {
  UUID: string
  name: string
}

export const Phase = {
  KEYWORD: 'keyword',
  DRAWING: 'drawing',
  DISCUSSION: 'discussion',
  VOTING: 'voting',
  VOTE_RESULT: 'vote-result',
  ROUND_RESULT: 'round-result',
  GAME_RESULT: 'game-result',
  GUESSING: 'guessing',
  END: 'end',
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
  isFoolMode: boolean
}

export type ChangeableSettings = Omit<Settings, 'lang' | 'octopusAmount'>

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

export interface Rank {
  player: Player
  score: Score
}
export type Score = {
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
  | { type: 'game_started'; data: undefined }
  | { type: 'vote_result'; data: VoteResultResponse }
  | { type: 'round_result'; data: RoundResultResponse }
  | { type: 'game_result'; data: GameResultResponse }
  | { type: 'error'; data: ErrorType }
  | { type: 'game_ended'; data: undefined }
  | {
      type: 'custom_words_updated'
      data: { customWords: { keyword: string; voteCount: number }[] }
    }

export type WelcomeResponse = {
  roomCode: string
  phase: Phase
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
    | 'octopus_guessed'
  variable: SystemChatVariable
}

export type VoteResultResponse = {
  voteResult: [string, number][]
  octopuses: Player[]
  votedPlayer: Player
}

export type RoundResultResponse = {
  ranks: Rank[]
  tied: boolean
  guessed: boolean
  isUnanimity: boolean
  octopuses: Player[]
  winningTeam: 'octopus' | 'squid'
}

export type GameResultResponse = {
  ranks: Rank[]
}

export const Team = {
  OCTOPUS: 'octopus',
  SQUID: 'squid',
}

export type Team = (typeof Team)[keyof typeof Team]
