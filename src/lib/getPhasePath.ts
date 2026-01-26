import { ROUTES } from '@/routes/ROUTES'
import { Phase } from '@/types'

export function getPhasePath(phase: Phase): string {
  switch (phase) {
    case Phase.OUT:
      return ROUTES.WAITING
    case Phase.KEYWORD:
      return ROUTES.KEYWORD
    case Phase.DRAWING:
      return ROUTES.DRAWING
    case Phase.DISCUSSION:
      return ROUTES.DISCUSSION
    case Phase.VOTING:
      return ROUTES.VOTING
    case Phase.VOTE_RESULT:
      return ROUTES.VOTE_RESULT
    case Phase.GUESSING:
      return ROUTES.GUESSING
    case Phase.RESULT:
      return ROUTES.RESULT
    default:
      return ROUTES.WAITING
  }
}
