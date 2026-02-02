import type { Player } from './types'

const SOCKET_MESSAGE_ERROR = 'SOCKET_MESSAGE_ERROR'

export { SOCKET_MESSAGE_ERROR }

export const COLORS = ['#000000', '#FFFFFF', '#d21717', '#00b300', '#0000FF']

export const DEFAULT_STROKE_WIDTH = 5
export const MAX_STROKE_WIDTH = 150
export const MIN_STROKE_WIDTH = 1

export const CONFETTI_DELAY = 5200

export const SYSTEM = { name: 'System', UUID: 'system' } as Player
