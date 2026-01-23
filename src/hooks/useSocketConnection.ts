import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SOCKET_MESSAGE_ERROR } from '@/consts'
import { useSocketHandlers } from '@/hooks/useSocketHandlers'
import { type ErrorType, type Message } from '@/types'

export function useSocketConnection(
  setError: (error: null | ErrorType) => void,
) {
  const [ws, setWs] = useState<WebSocket | null>(
    new WebSocket(getRoomSocketUrl()),
  )
  const [isConnecting, setIsConnecting] = useState(false)
  const handlers = useSocketHandlers()

  const navigate = useNavigate()

  function getRoomSocketUrl() {
    return import.meta.env.VITE_WS_URL
  }

  function reconnect() {
    setIsConnecting(true)
    console.log('Reconnecting WebSocket...')
    if (ws) {
      ws.close()
    }
    const newSocket = new WebSocket(getRoomSocketUrl())
    setWs(newSocket)
    newSocket.onerror = () => {
      console.error('WebSocket reconnection error')
      setIsConnecting(false)
    }
    newSocket.onopen = () => {
      console.log('WebSocket reconnected')
      setIsConnecting(false)
      setError(null)
    }
  }

  function sendMessage(
    mainType: string,
    subType: string,
    data?: Record<string, unknown>,
  ) {
    if (!ws) return
    if (ws.readyState !== WebSocket.OPEN) {
      setError({
        message: 'socket not connected',
        code: SOCKET_MESSAGE_ERROR,
      })
      return
    }
    ws.send(
      JSON.stringify({
        mainType,
        subType,
        data,
      }),
    )
  }

  useEffect(() => {
    console.log(ws)
    return () => {
      if (ws) ws.close()
    }
  }, [ws])

  useEffect(() => {
    if (!ws) return
    console.log('Setting up WebSocket event listeners')

    const messageHandler = (event: MessageEvent) => {
      try {
        const { type, data } = JSON.parse(event.data) as Message
        console.log('Received message:', type, data)
        handlers[type](data)
      } catch (error) {
        setError({
          message: 'socket message error',
          code: SOCKET_MESSAGE_ERROR,
          error,
        })
      }
    }

    ws.addEventListener('message', messageHandler)
    ws.addEventListener('disconnect', () => {
      console.warn('Socket disconnected, retrying connection...')
      setError({
        message: 'socket disconnected',
        code: SOCKET_MESSAGE_ERROR,
      })
    })

    return () => {
      ws.removeEventListener('message', messageHandler)
    }
  }, [navigate, setError, ws, handlers])

  return {
    reconnect,
    isConnecting,
    sendMessage,
  }
}
