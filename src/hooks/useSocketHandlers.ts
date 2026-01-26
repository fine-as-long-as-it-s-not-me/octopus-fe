import { useMemo } from 'react'

import { useGameStore } from '@/store/gameStore'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'
import {
  Phase,
  type CanvasUpdatedResponse,
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
  const { setRoomCode, setPlayers, setSettings } = useRoomStore()
  const { name, UUID, setId } = useUserStore()
  const {
    setStrokes,
    setCanvasColor,
    setPhase,
    setRound,
    setTimeLeft,
    setPainterUUID,
    setKeyword,
  } = useGameStore()

  const handlers = useMemo(
    () => ({
      keyword: ({ keyword }: { keyword: string }) => {
        setKeyword(keyword)
      },
      canvas_updated: ({ strokes, bgColor }: CanvasUpdatedResponse) => {
        setStrokes(strokes)
        setCanvasColor(bgColor)
      },
      round_updated: ({ round }: RoundResponse) => {
        setRound(round)
      },
      painter: ({ UUID }: PainterResponse) => {
        setPainterUUID(UUID)
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
      setStrokes,
      setCanvasColor,
      setId,
      setKeyword,
    ],
  )

  return handlers
}
