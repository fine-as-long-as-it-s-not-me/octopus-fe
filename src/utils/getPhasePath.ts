export function getPhasePath(phase: string, roomCode: string): string {
  /**
   * 
      'waiting',
      'keyword',
      'drawing',
      'discussion',
      'voting',
      'vote-result',
      'guessing',
      'result',
   */
  switch (phase) {
    case 'waiting':
      return `/room/${roomCode}`
    case 'keyword':
      return `/room/${roomCode}/keyword`
    case 'drawing':
      return `/room/${roomCode}/drawing`
    case 'discussion':
      return `/room/${roomCode}/discussion`
    case 'voting':
      return `/room/${roomCode}/voting`
    case 'vote-result':
      return `/room/${roomCode}/vote-result`
    case 'guessing':
      return `/room/${roomCode}/guessing`
    case 'result':
      return `/room/${roomCode}/result`
    default:
      return `/room/${roomCode}`
  }
}
