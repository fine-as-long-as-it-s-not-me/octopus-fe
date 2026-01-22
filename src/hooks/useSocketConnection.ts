import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SOCKET_MESSAGE_ERROR } from '@/consts'
import { ROUTES } from '@/routes/ROUTES'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'
import {
  type ErrorType,
  type Message,
  type PlayersUpdatedData,
  type WelcomeData,
} from '@/types'

export function useSocketConnection(
  setError: (error: null | ErrorType) => void,
) {
  const [ws, setWs] = useState<WebSocket | null>(
    new WebSocket(getRoomSocketUrl()),
  )
  const [isConnecting, setIsConnecting] = useState(false)
  const { setRoomCode, setPlayers } = useRoomStore()

  const navigate = useNavigate()
  const { setId: setUserId } = useUserStore()

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
    const socket = ws
    if (!socket) return

    const handlers = {
      welcome: ({ roomCode, userId }: WelcomeData) => {
        setUserId(userId)
        setRoomCode(roomCode)
        navigate(ROUTES.WAITING)
      },
      players_updated: ({ hostId, players }: PlayersUpdatedData) => {
        // Update players state here
        setPlayers(
          players.map(player => ({
            ...player,
            host: player.id === hostId,
          })),
        )
      },
    }

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

    socket.addEventListener('message', messageHandler)
    socket.addEventListener('disconnect', () => {
      //retry connection
      console.warn('Socket disconnected, retrying connection...')

      const newSocket = new WebSocket(getRoomSocketUrl())
      setWs(newSocket)
    })

    return () => {
      socket.removeEventListener('message', messageHandler)
    }
  }, [navigate, setUserId, setRoomCode, setPlayers, setError, ws])

  return {
    reconnect,
    isConnecting,
    sendMessage,
  }
}
