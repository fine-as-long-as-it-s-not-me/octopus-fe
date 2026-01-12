export const ROUTES = {
  HOME: '/',
  LOBBY: '/lobby',
  LEADERBOARD: '/leaderboard',
  ROOM: (roomId: string) => `/room/${roomId}`,
  KEYWORD_SETTING: (roomId: string) => `/room/${roomId}/keyword-setting`,
  DRAWING: (roomId: string) => `/room/${roomId}/drawing`,
  DISCUSSION: (roomId: string) => `/room/${roomId}/discussion`,
  KEYWORD: (roomId: string) => `/room/${roomId}/keyword`,
  RESULT: (roomId: string) => `/room/${roomId}/result`,
}
