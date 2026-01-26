import { ROUTES } from '@/routes/ROUTES'

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
    case 'OUT':
      return ROUTES.WAITING
    case 'keyword':
      return ROUTES.KEYWORD
    case 'drawing':
      return ROUTES.DRAWING
    case 'discussion':
      return ROUTES.DISCUSSION
    case 'voting':
      return ROUTES.VOTING
    case 'vote-result':
      return ROUTES.VOTE_RESULT
    case 'guessing':
      return ROUTES.GUESSING
    case 'result':
      return ROUTES.RESULT
    default:
      return ROUTES.WAITING
  }
}
