import { SYSTEM } from '@/consts'
import type { ChatResponse, GameResultResponse, MessageHandlers } from '@/types'

type GameHandlersDeps = {
  setRanks: (ranks: GameResultResponse['ranks']) => void
  addChat: (chat: ChatResponse) => void
  t: (key: string) => string
  isFullscreen: boolean
  fullscreenToggle: (onError?: () => void) => void
}

export const createGameHandlers = ({
  setRanks,
  addChat,
  t,
  isFullscreen,
  fullscreenToggle,
}: GameHandlersDeps): Pick<
  MessageHandlers,
  'game_started' | 'game_result' | 'game_ended'
> => ({
  game_started: () => {
    addChat({ player: SYSTEM, text: t('The game has been started.') })
    if (!isFullscreen) fullscreenToggle()
  },
  game_result: ({ ranks }) => {
    setRanks(ranks)
  },
  game_ended: () => {},
})
