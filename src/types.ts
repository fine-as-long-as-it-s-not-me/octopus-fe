export interface Player {
  id: string
  name: string
  photoUrl?: string
}

export interface Keyword {
  id: string
  word: string
  addedBy: Player
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
