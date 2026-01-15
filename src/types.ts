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
