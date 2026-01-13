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
