import { SYSTEM } from '@/consts'
import type { ChatResponse, GameResultResponse, MessageHandlers } from '@/types'

type GameHandlersDeps = {
  setIsStarted: (isStarted: boolean) => void
  setRanks: (ranks: GameResultResponse['ranks']) => void
  addChat: (chat: ChatResponse) => void
  t: (key: string) => string
}

export const createGameHandlers = ({
  setIsStarted,
  setRanks,
  addChat,
  t,
}: GameHandlersDeps): Pick<
  MessageHandlers,
  'game_started' | 'game_result' | 'game_ended'
> => ({
  game_started: () => {
    setIsStarted(true)
    addChat({ player: SYSTEM, text: t('The game has been started.') })
  },
  game_result: ({ ranks }) => {
    setRanks(ranks)
  },
  game_ended: () => {
    setIsStarted(false)
  },
})
