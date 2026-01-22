import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/routes/ROUTES'
import { useGameStore } from '@/store/gameStore'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'
import {
  type Message,
  type PlayersUpdatedData,
  type WelcomeData,
} from '@/types'
import { getRoomSocketUrl, sendMessage } from '@/utils/socket'

export function useRoomSocket() {
  const socketRef = useRef<WebSocket | null>(null)
  const { roomCode, setRoomCode, setPlayers } = useRoomStore()
  const { addStroke } = useGameStore()

  const navigate = useNavigate()
  const { setId: setUserId, name } = useUserStore()

  const joinRoom = (roomCode: string) => {
    if (!socketRef.current) return
    sendMessage(socketRef.current, 'room', 'join', { roomCode, name })
  }

  const joinRandomRoom = () => {
    if (!socketRef.current) return
    sendMessage(socketRef.current, 'room', 'join_random', { name })
  }

  const leaveRoom = () => {
    if (!socketRef.current) return
    sendMessage(socketRef.current, 'room', 'leave', { roomCode })
    setRoomCode('')
  }

  useEffect(() => {
    const socket = new WebSocket(getRoomSocketUrl())
    socketRef.current = socket

    return () => {
      socket.close()
      socketRef.current = null
    }
  }, [])

  useEffect(() => {
    const socket = socketRef.current
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
        console.error('Error parsing message:', error)
      }
    }

    socket.addEventListener('message', messageHandler)
    socket.addEventListener('disconnect', () => {
      //retry connection
      console.warn('Socket disconnected, retrying connection...')

      const newSocket = new WebSocket(getRoomSocketUrl())
      socketRef.current = newSocket
    })

    return () => {
      socket.removeEventListener('message', messageHandler)
    }
  }, [navigate, setUserId, setRoomCode, setPlayers])

  return {
    socketRef,
    addStroke,
    joinRoom,
    joinRandomRoom,
    leaveRoom,
  }
}
