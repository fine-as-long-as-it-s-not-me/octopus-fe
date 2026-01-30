import { ROUTES } from '@/routes/ROUTES'
import { Phase } from '@/types'

export function getPhasePath(phase: Phase): string {
  switch (phase) {
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
    case Phase.ROUND_RESULT:
      return ROUTES.ROUND_RESULT
    case Phase.GAME_RESULT:
      return ROUTES.ROUND_RESULT
    default:
      return ROUTES.ROOM
  }
}
