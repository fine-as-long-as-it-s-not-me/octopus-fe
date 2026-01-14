export const ROUTES = {
  HOME: '/',
  LOBBY: '/lobby',
  LEADERBOARD: '/leaderboard',
  ROOM: (roomId: string) => `/room/${roomId}`,
  CUSTOM_WORD: (roomId: string) => `/room/${roomId}/custom-words`,
  DRAWING: (roomId: string) => `/room/game/${roomId}/drawing`,
  DISCUSSION: (roomId: string) => `/room/game/${roomId}/discussion`,
  KEYWORD: (roomId: string) => `/room/game/${roomId}/keyword`,
  RESULT: (roomId: string) => `/room/game/${roomId}/result`,
  GAME: (roomId: string) => `/room/game/${roomId}`,
}
