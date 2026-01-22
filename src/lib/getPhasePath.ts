export function getPhasePath(phase: string): string {
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
      return `/room`
    case 'keyword':
      return `/room/keyword`
    case 'drawing':
      return `/room/drawing`
    case 'discussion':
      return `/room/discussion`
    case 'voting':
      return `/room/voting`
    case 'vote-result':
      return `/room/vote-result`
    case 'guessing':
      return `/room/guessing`
    case 'result':
      return `/room/result`
    default:
      return `/room`
  }
}
