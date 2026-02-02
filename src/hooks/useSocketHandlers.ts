import { useTranslation } from 'react-i18next'

import { SYSTEM } from '@/consts'
import { useToast } from '@/context/ToastContext'
import { useWindow } from '@/context/WindowContext'
import { createErrorHandlers } from '@/hooks/socketHandlers/errorHandlers'
import { createGameHandlers } from '@/hooks/socketHandlers/gameHandlers'
import { createRoomHandlers } from '@/hooks/socketHandlers/roomHandlers'
import { createRoundHandlers } from '@/hooks/socketHandlers/roundHandlers'
import i18n from '@/i18n'
import { useGameStore } from '@/store/gameStore'
import { useRoomStore } from '@/store/roomStore'
import { useRoundStore } from '@/store/roundStore'
import { useUserStore } from '@/store/userStore'
import type { ChatResponse, MessageHandlers, SystemChatResponse } from '@/types'

export function useSocketHandlers(
  sendMessage: (
    mainType: string,
    subType: string,
    data?: Record<string, unknown>,
  ) => void,
): MessageHandlers {
  const { t } = useTranslation()
  const { notify } = useToast()
  const { isFullscreen, fullscreenToggle } = useWindow()
  const { addChat, setRoomCode, setPlayers, setSettings, setCustomWords } =
    useRoomStore()

  const { name, UUID, setId, lang } = useUserStore()
  const game = useGameStore()
  const {
    setPhase,
    init,
    setTied,
    setGuessed,
    setIsUnanimity,
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

  const addSystemChat = (text: string) => {
    addChat({ player: SYSTEM, text })
  }

  console.warn('Socket handlers created', lang, i18n.language)

  return {
    ...createRoomHandlers({
      name: name,
      UUID: UUID,
      sendMessage,
      setId: setId,
      setRoomCode: setRoomCode,
      setPlayers: setPlayers,
      setSettings: setSettings,
      setPhase: setPhase,
    }),

    chat_added: ({ player, text }: ChatResponse) => {
      const chat = { player, text }
      addChat(chat)
    },

    system_chat: ({ type, variable }: SystemChatResponse) => {
      switch (type) {
        case 'player_joined': {
          const text = `${(variable as { name: string }).name} ${t('joined the game')}.`
          addSystemChat(text)
          break
        }
        case 'player_left':
          addSystemChat(
            `${(variable as { name: string }).name} ${t('left the game')}.`,
          )
          break
        case 'discussion_time_changed': {
          const { name, amount } = variable as {
            amount: number
            name: string
          }
          addSystemChat(
            `${name} ${t(`has ${amount > 0 ? 'extended' : 'shortened'} the remaining time`)}.`,
          )
          break
        }
        case 'player_voted': {
          const { voterName } = variable as { voterName: string }
          addSystemChat(`${voterName} ${t('has voted')}.`)
          break
        }
        case 'revote': {
          addSystemChat(
            t(
              'Revote has been initiated due to a tie. If tie occurs again, octopus wins.',
            ),
          )
          break
        }
        case 'octopus_guessed': {
          const { name, word } = variable as { name: string; word: string }
          addSystemChat(`${name} ${t('guessed the code :')} '${word}'`)
          break
        }
        default:
          break
      }
    },

    ...createRoundHandlers({
      initRound: init,
      setTied: setTied,
      setGuessed: setGuessed,
      setIsUnanimity: setIsUnanimity,
      setPhase: setPhase,
      setKeyword: setKeyword,
      setStrokes: setStrokes,
      setTimeLeft: setTimeLeft,
      setOctopuses: setOctopuses,
      setVoteResult: setVoteResult,
      setCanvasColor: setCanvasColor,
      setPainterUUID: setPainterUUID,
      setNextPainterUUID: setNextPainterUUID,
      setVotedPlayer: setVotedPlayer,
      setWinningTeam: setWinningTeam,
      setRound: game.setRound,
      setRanks: game.setRanks,
      setCustomWords: setCustomWords,
    }),

    ...createGameHandlers({
      setRanks: game.setRanks,
      addChat: addChat,
      t,
      isFullscreen,
      fullscreenToggle,
    }),

    ...createErrorHandlers({ notify }),
  }
}
