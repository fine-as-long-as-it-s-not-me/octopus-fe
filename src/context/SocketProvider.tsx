import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useRouteByPhase from '@/hooks/useRouteByPhase'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { type ErrorType } from '@/types'
import { SocketContext } from './SocketContext'

interface Props {
  children: React.ReactNode
}

export default function SocketProvider({ children }: Props) {
  const [error, setError] = useState<null | ErrorType>(null)
  const { t } = useTranslation()

  const { connectSocket, isConnected, isConnecting, sendMessage } =
    useSocketConnection(setError)

  useEffect(() => {
    if ((error || !isConnected) && !isConnecting) {
      const interval = setInterval(connectSocket, 1000)

      return () => clearInterval(interval)
    }
  }, [error, isConnected, isConnecting, connectSocket, setError])

  useRouteByPhase()

  return (
    <SocketContext.Provider
      value={{
        sendMessage,
      }}
    >
      {children}

      {error && (
        <div className='absolute inset-0 z-1002 flex flex-col items-center justify-center gap-4 bg-black/75 text-white'>
          <p>[{error.message}]</p>
          <p>{t('Connecting to server...')}</p>
          <span className='loader' />
        </div>
      )}
    </SocketContext.Provider>
  )
}
