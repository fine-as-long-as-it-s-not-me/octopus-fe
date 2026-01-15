export const ROUTES = {
  HOME: '/',
  LOBBY: '/lobby',
  LEADERBOARD: '/leaderboard',
  ROOM: (roomId: string) => `/room/${roomId}`,
  CUSTOM_WORD: (roomId: string) => `/room/${roomId}/custom-words`,
  KEYWORD: (roomId: string) => `/room/${roomId}/keyword`,
  DRAWING: (roomId: string) => `/room/${roomId}/drawing`,
  DISCUSSION: (roomId: string) => `/room/${roomId}/discussion`,
  GUESSING: (roomId: string) => `/room/${roomId}/guessing`,
  VOTING: (roomId: string) => `/room/${roomId}/voting`,
  VOTE_RESULT: (roomId: string) => `/room/${roomId}/vote-result`,
  RESULT: (roomId: string) => `/room/${roomId}/result`,
}
