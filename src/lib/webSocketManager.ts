// websocketManager.ts
export type WSMessage = string | ArrayBuffer | Blob

interface WSOptions {
  url: string
  protocols?: string | string[]
  reconnectInterval?: number // base ms
  maxReconnectInterval?: number // cap ms
  maxRetries?: number
  onMessage?: (event: MessageEvent) => void
  onOpen?: () => void
  onClose?: (event: CloseEvent) => void
  onError?: (event: Event) => void
}

export class WebSocketManager {
  private ws: WebSocket | null = null
  private retries = 0
  private shouldReconnect = true

  private readonly options: Required<
    Pick<WSOptions, 'reconnectInterval' | 'maxReconnectInterval' | 'maxRetries'>
  >

  private config: WSOptions

  constructor(config: WSOptions) {
    this.config = config

    this.options = {
      reconnectInterval: config.reconnectInterval ?? 1000,
      maxReconnectInterval: config.maxReconnectInterval ?? 30000,
      maxRetries: config.maxRetries ?? Infinity,
    }

    this.connect()
  }

  private connect() {
    if (this.retries >= this.options.maxRetries) return

    this.ws = new WebSocket(this.config.url, this.config.protocols)

    this.ws.onopen = () => {
      this.retries = 0
      this.config.onOpen?.()
    }

    this.ws.onmessage = event => {
      this.config.onMessage?.(event)
    }

    this.ws.onerror = event => {
      this.config.onError?.(event)
    }

    this.ws.onclose = event => {
      this.config.onClose?.(event)
      if (this.shouldReconnect) {
        this.scheduleReconnect()
      }
    }
  }

  private scheduleReconnect() {
    this.retries += 1
    const delay = Math.min(
      this.options.reconnectInterval * 2 ** (this.retries - 1),
      this.options.maxReconnectInterval,
    )

    setTimeout(() => {
      if (this.shouldReconnect) {
        this.connect()
      }
    }, delay)
  }

  send(data: WSMessage): boolean {
    try {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        throw new Error('WebSocket not open')
      }
      this.ws.send(data)
      return true
    } catch {
      // Trigger reconnect on send failure
      this.ws?.close()
      return false
    }
  }

  close() {
    this.shouldReconnect = false
    this.ws?.close()
  }
}
