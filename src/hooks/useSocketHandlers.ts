import { useMemo } from 'react'

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
  type TickResponse,
  type WelcomeResponse,
} from '@/types'

export function useSocketHandlers(
  sendMessage: (
    mainType: string,
    subType: string,
    data?: Record<string, unknown>,
  ) => void,
) {
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
  } = useGameStore()

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
        setRoomCode(roomCode ?? '')

        if (roomCode) sendMessage('room', 'join', { roomCode, name, UUID })
        else setPhase(Phase.OUT)
      },
      chat_added: ({ player, text }: ChatResponse) => {
        // Handled in Chat component
        const chat = { player, text }
        addChat(chat)
      },
    }),
    [
      name,
      UUID,
      setRoomCode,
      setPlayers,
      setSettings,
      setPhase,
      setRound,
      setTimeLeft,
      sendMessage,
      setPainterUUID,
      setNextPainterUUID,
      setStrokes,
      setCanvasColor,
      setId,
      setKeyword,
      addChat,
    ],
  )

  return handlers
}
