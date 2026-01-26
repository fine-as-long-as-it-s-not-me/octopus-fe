import { useCallback, useRef, useState } from 'react'

import { SOCKET_MESSAGE_ERROR } from '@/consts'
import { useSocketHandlers } from '@/hooks/useSocketHandlers'
import { useUserStore } from '@/store/userStore'
import { type ErrorType, type Message, type MessageHandlers } from '@/types'

export function useSocketConnection(
  setError: (error: null | ErrorType) => void,
) {
  const ws = useRef<WebSocket | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { name, UUID, lang } = useUserStore()

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
      setIsConnected(true)
      setIsConnecting(false)
      setError(null)
      sendMessage('player', 'login', { name, UUID, lang })
    }
    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data) as Message
        console.log('Received message:', message.type, message.data)

        const handler = handlers[message.type]
        if (handler) {
          handler(
            message.data as Extract<
              MessageHandlers,
              { type: typeof message.type }
            >,
          )
        } else {
          console.warn('No handler for message type:', message.type)
        }
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
    lang,
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
