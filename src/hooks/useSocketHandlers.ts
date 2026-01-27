import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useToast } from '@/context/ToastContext'
import { useGameStore } from '@/store/gameStore'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'
import {
  Phase,
  type CanvasUpdatedResponse,
  type ChatResponse,
  type KeywordResponse,
  type MessageHandlers,
  type PainterResponse,
  type PlayerLoggedInResponse,
  type PlayersUpdatedResponse,
  type RoundResponse,
  type SettingsUpdatedResponse,
  type SystemChatResponse,
  type TickResponse,
  type VoteResultResponse,
  type WelcomeResponse,
} from '@/types'

export function useSocketHandlers(
  sendMessage: (
    mainType: string,
    subType: string,
    data?: Record<string, unknown>,
  ) => void,
) {
  const { t } = useTranslation()
  const { name, UUID, setId } = useUserStore()
  const { setRoomCode, setPlayers, setSettings, addChat } = useRoomStore()
  const {
    setStrokes,
    setCanvasColor,
    setPhase,
    setRound,
    setTimeLeft,
    setPainterUUID,
    setKeyword,
    setNextPainterUUID,
    setVoteResult,
  } = useGameStore()
  const { notify } = useToast()

  const handlers: MessageHandlers = useMemo(
    () => ({
      keyword: ({ keyword }: KeywordResponse) => {
        setKeyword(keyword)
      },
      canvas_updated: ({ strokes, bgColor }: CanvasUpdatedResponse) => {
        setStrokes(strokes)
        setCanvasColor(bgColor)
      },
      round_updated: ({ round }: RoundResponse) => {
        setRound(round)
      },
      painter: ({ UUID, nextUUID }: PainterResponse) => {
        setPainterUUID(UUID)
        setNextPainterUUID(nextUUID)
      },
      tick: ({ round, phase, timeLeft }: TickResponse) => {
        setPhase(phase)
        setRound(round)
        setTimeLeft(timeLeft)
      },
      settings_updated: ({ settings }: SettingsUpdatedResponse) => {
        setSettings(settings)
      },
      welcome: ({ roomCode }: WelcomeResponse) => {
        setRoomCode(roomCode)
      },
      players_updated: ({ hostUUID, players }: PlayersUpdatedResponse) => {
        // Update players state here
        setPlayers(
          players.map(player => ({
            ...player,
            host: player.UUID === hostUUID,
          })),
        )
      },
      hello: ({ roomCode, id }: PlayerLoggedInResponse) => {
        setId(id)
        setRoomCode(roomCode)

        if (roomCode) sendMessage('room', 'join', { roomCode, name, UUID })
        else setPhase(Phase.OUT)
      },
      chat_added: ({ player, text }: ChatResponse) => {
        // Handled in Chat component
        const chat = { player, text }
        addChat(chat)
      },
      system_chat: ({ type, variable }: SystemChatResponse) => {
        // Handled in Chat component
        const player = { name: 'System', UUID: 'system' }
        switch (type) {
          case 'player_joined':
            addChat({
              player,
              text: `${(variable as { name: string }).name} ${t('joined the game')}.`,
            })
            break
          case 'player_left':
            addChat({
              player,
              text: `${(variable as { name: string }).name} ${t('left the game')}.`,
            })
            break
          case 'discussion_time_changed': {
            const { name, amount } = variable as {
              amount: number
              name: string
            }
            addChat({
              player,
              text: `${name} ${t(`has ${amount > 0 ? 'extended' : 'shortened'} the remaining time`)}.`,
            })
            break
          }
          case 'player_voted': {
            const { voterName } = variable as { voterName: string }
            addChat({
              player,
              text: `${voterName} ${t('has voted')}.`,
            })
            break
          }
          default:
            break
        }
      },
      vote_result: ({ voteResult }: VoteResultResponse) => {
        setVoteResult(voteResult)
      },
      error: ({ message }: { message: string }) => {
        notify(message)
      },
    }),
    [
      t,
      name,
      UUID,
      notify,
      setId,
      addChat,
      setRound,
      setPhase,
      setPlayers,
      setStrokes,
      setKeyword,
      sendMessage,
      setSettings,
      setRoomCode,
      setTimeLeft,
      setVoteResult,
      setPainterUUID,
      setCanvasColor,
      setNextPainterUUID,
    ],
  )

  return handlers
}
