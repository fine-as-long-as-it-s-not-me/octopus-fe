import type { Phase, Player, Setting } from '@/types'

export type RoomSocketMessage =
  | {
      type: 'room_state'
      payload: {
        roomCode?: string
        players?: Player[]
        phase?: Phase
        timeLeft?: number
        round?: number
        setting?: Setting
      }
    }
  | {
      type: 'players_updated'
      payload: {
        players: Player[]
      }
    }
  | {
      type: 'phase_updated'
      payload: {
        phase: Phase
        timeLeft?: number
        round?: number
      }
    }
  | {
      type: 'setting_updated'
      payload: Partial<Setting>
    }
  | {
      type: 'room_code'
      payload: {
        roomCode: string
      }
    }

const ALLOWED_TYPES = [
  'room_state',
  'players_updated',
  'phase_updated',
  'setting_updated',
  'room_code',
] as const

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isAllowedType = (value: string): value is RoomSocketMessage['type'] =>
  (ALLOWED_TYPES as readonly string[]).includes(value)

export const parseRoomSocketMessage = (
  raw: string,
): RoomSocketMessage | null => {
  try {
    const data = JSON.parse(raw)
    if (!isRecord(data)) return null
    const { type, payload } = data
    if (typeof type !== 'string' || !isAllowedType(type)) return null
    if (!isRecord(payload)) return null
    return { type, payload } as RoomSocketMessage
  } catch {
    return null
  }
}

export const getRoomSocketUrl = (roomCode: string) => {
  const envUrl = import.meta.env.VITE_WS_URL as string | undefined
  if (envUrl) return `${envUrl}?roomCode=${encodeURIComponent(roomCode)}`

  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  return `${protocol}://${window.location.host}/ws?roomCode=${encodeURIComponent(
    roomCode,
  )}`
}
