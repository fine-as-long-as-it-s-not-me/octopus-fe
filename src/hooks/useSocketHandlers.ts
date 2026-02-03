import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@/context/ToastContext'
import { useWindow } from '@/context/WindowContext'
import { createChatHandlers } from '@/hooks/socketHandlers/chatHandlers'
import { createErrorHandlers } from '@/hooks/socketHandlers/errorHandlers'
import { createGameHandlers } from '@/hooks/socketHandlers/gameHandlers'
import { createRoomHandlers } from '@/hooks/socketHandlers/roomHandlers'
import { createRoundHandlers } from '@/hooks/socketHandlers/roundHandlers'
import { useGameStore } from '@/store/gameStore'
import { useRoomStore } from '@/store/roomStore'
import { useRoundStore } from '@/store/roundStore'
import { useUserStore } from '@/store/userStore'
import type { MessageHandlers } from '@/types'

export function useSocketHandlers(
  sendMessage: (
    mainType: string,
    subType: string,
    data?: Record<string, unknown>,
  ) => void,
): MessageHandlers {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { toast } = useToast()
  const { isFullscreen, fullscreenToggle } = useWindow()

  const user = useUserStore()
  const room = useRoomStore()
  const game = useGameStore()
  const round = useRoundStore()

  return {
    ...createRoomHandlers({
      name: user.name,
      UUID: user.UUID,
      sendMessage,
      setId: user.setId,
      setRoomCode: room.setRoomCode,
      setPlayers: room.setPlayers,
      setSettings: room.setSettings,
      setPhase: round.setPhase,
      setHostUUID: room.setHostUUID,
    }),

    ...createChatHandlers({
      t,
      addChat: room.addChat,
    }),

    ...createRoundHandlers({
      initRound: round.init,
      setTied: round.setTied,
      setGuessed: round.setGuessed,
      setIsUnanimity: round.setIsUnanimity,
      setPhase: round.setPhase,
      setKeyword: round.setKeyword,
      setStrokes: round.setStrokes,
      setTimeLeft: round.setTimeLeft,
      setOctopuses: round.setOctopuses,
      setVoteResult: round.setVoteResult,
      setCanvasColor: round.setCanvasColor,
      setPainterUUID: round.setPainterUUID,
      setNextPainterUUID: round.setNextPainterUUID,
      setVotedPlayer: round.setVotedPlayer,
      setWinningTeam: round.setWinningTeam,
      setRound: game.setRound,
      setRanks: game.setRanks,
      setCustomKeywords: room.setCustomKeywords,
    }),

    ...createGameHandlers({
      setRanks: game.setRanks,
      addChat: room.addChat,
      t,
      isFullscreen,
      fullscreenToggle,
    }),

    ...createErrorHandlers({ toast, setUsername: user.setName, navigate }),
  }
}
