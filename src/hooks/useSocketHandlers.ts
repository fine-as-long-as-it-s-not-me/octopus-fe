import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { name, UUID, setId } = useUserStore()
  const { setRoomCode, setPlayers, setSettings, addChat, setCustomWords } =
    useRoomStore()
  const { setRound, setRanks } = useGameStore()
  const { isFullscreen, fullscreenToggle } = useWindow()
  const {
    init: initRound,
    setTied,
    setGuessed,
    setIsUnanimity,
    setPhase,
    setKeyword,
    setStrokes,
    setTimeLeft,
    setOctopuses,
    setVoteResult,
    setCanvasColor,
    setPainterUUID,
    setNextPainterUUID,
    setVotedPlayer,
    setWinningTeam,
  } = useRoundStore()

  const { notify } = useToast()

  const roomHandlers = useMemo(
    () =>
      createRoomHandlers({
        name,
        UUID,
        sendMessage,
        setId,
        setRoomCode,
        setPlayers,
        setSettings,
        setPhase,
      }),
    [
      name,
      UUID,
      sendMessage,
      setId,
      setRoomCode,
      setPlayers,
      setSettings,
      setPhase,
    ],
  )

  const chatHandlers = useMemo(
    () =>
      createChatHandlers({
        t,
        addChat,
      }),
    [t, addChat],
  )

  const roundHandlers = useMemo(
    () =>
      createRoundHandlers({
        initRound,
        setTied,
        setGuessed,
        setIsUnanimity,
        setPhase,
        setKeyword,
        setStrokes,
        setTimeLeft,
        setOctopuses,
        setVoteResult,
        setCanvasColor,
        setPainterUUID,
        setNextPainterUUID,
        setRound,
        setRanks,
        setCustomWords,
        setVotedPlayer,
        setWinningTeam,
      }),
    [
      initRound,
      setTied,
      setGuessed,
      setIsUnanimity,
      setPhase,
      setKeyword,
      setStrokes,
      setTimeLeft,
      setOctopuses,
      setVoteResult,
      setCanvasColor,
      setPainterUUID,
      setNextPainterUUID,
      setRound,
      setRanks,
      setCustomWords,
      setVotedPlayer,
      setWinningTeam,
    ],
  )

  const gameHandlers = useMemo(
    () =>
      createGameHandlers({
        setRanks,
        addChat,
        t,
        isFullscreen,
        fullscreenToggle,
      }),
    [setRanks, addChat, t, isFullscreen, fullscreenToggle],
  )

  const errorHandlers = useMemo(() => createErrorHandlers({ notify }), [notify])

  return useMemo(
    () => ({
      ...roomHandlers,
      ...chatHandlers,
      ...roundHandlers,
      ...gameHandlers,
      ...errorHandlers,
    }),
    [roomHandlers, chatHandlers, roundHandlers, gameHandlers, errorHandlers],
  )
}
