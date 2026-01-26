import { useSocket } from '@/context/SocketContext'
import type { Stroke } from '@/types'

export function useAddStroke() {
  const { sendMessage } = useSocket()
  return { mutate: (stroke: Stroke) => sendMessage('draw', 'add', { stroke }) }
}

export function useBgColor() {
  const { sendMessage } = useSocket()
  return {
    mutate: (color: string) => sendMessage('draw', 'background', { color }),
  }
}
