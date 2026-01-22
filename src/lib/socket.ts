export function getRoomSocketUrl() {
  return import.meta.env.VITE_WS_URL
}

export function sendMessage(
  socket: WebSocket,
  mainType: string,
  subType: string,
  data?: Record<string, unknown>,
) {
  if (!socket) return
  console.log('WebSocket ready state:', socket.readyState)
  if (socket.readyState !== WebSocket.OPEN) {
    throw Error('WebSocket is not open')
  }
  console.log('Sending message:', { mainType, subType, data })
  socket.send(
    JSON.stringify({
      mainType,
      subType,
      data,
    }),
  )
}
