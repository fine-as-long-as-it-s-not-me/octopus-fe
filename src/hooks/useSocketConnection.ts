import { useCallback, useRef, useState } from 'react'

import { SOCKET_MESSAGE_ERROR } from '@/consts'
import { useSocketHandlers } from '@/hooks/useSocketHandlers'
import { useUserStore } from '@/store/userStore'
import { type ErrorType, type Message } from '@/types'

export function useSocketConnection(
  setError: (error: null | ErrorType) => void,
) {
  const ws = useRef<WebSocket | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { name, UUID } = useUserStore()

  const sendMessage = useCallback(
    (mainType: string, subType: string, data?: Record<string, unknown>) => {
      if (!ws.current) {
        console.error('WebSocket not initialized')
        setError({
          message: 'socket not initialized',
          code: SOCKET_MESSAGE_ERROR,
        })
        return
      }
      if (ws.current.readyState !== WebSocket.OPEN) {
        console.error('WebSocket not ready yet')
        setError({
          message: 'socket not connected',
          code: SOCKET_MESSAGE_ERROR,
        })
        return
      }
      console.log('Sending message:', mainType, subType, data)
      ws.current.send(
        JSON.stringify({
          mainType,
          subType,
          data,
        }),
      )
    },
    [setError, ws],
  )

  const handlers = useSocketHandlers(sendMessage)

  const connectSocket = useCallback(() => {
    setIsConnecting(true)
    console.log('Connecting WebSocket...')
    if (ws.current) {
      ws.current.close()
    }

    ws.current = new WebSocket(import.meta.env.VITE_WS_URL)
    ws.current.onerror = () => {
      console.error('WebSocket error')
      setIsConnecting(false)
      setError({
        message: 'socket error',
        code: SOCKET_MESSAGE_ERROR,
      })
    }
    ws.current.onopen = () => {
      console.log('WebSocket connected')
      setIsConnected(true)
      setIsConnecting(false)
      setError(null)

      console.log('Registering player:', name, UUID)
      sendMessage('player', 'login', { name, UUID })
    }
    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const { type, data } = JSON.parse(event.data) as Message
        console.log('Received message:', type, data)
        handlers[type]?.(data)
      } catch (error) {
        setError({
          message: 'socket message error',
          code: SOCKET_MESSAGE_ERROR,
          error,
        })
      }
    }
  }, [
    handlers,
    name,
    UUID,
    setError,
    setIsConnecting,
    setIsConnected,
    sendMessage,
  ])

  const closeSocket = useCallback(() => {
    if (ws.current) {
      ws.current.close()
      ws.current = null
      setIsConnected(false)
      setIsConnecting(false)
      console.log('WebSocket closed')
    }
  }, [])

  return {
    connectSocket,
    isConnecting,
    isConnected,
    sendMessage,
    closeSocket,
  }
}
