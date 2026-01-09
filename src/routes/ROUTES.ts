export const ROUTES = {
  HOME: '/',
  LOBBY: '/lobby',
  LEADERBOARD: '/leaderboard',
  ROOM: (roomId: string) => `/room/${roomId}`,
}
