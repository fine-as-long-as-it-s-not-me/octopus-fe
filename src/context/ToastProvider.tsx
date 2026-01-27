import { useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ToastContext } from './ToastContext'

type Props = { children: ReactNode }

type Toast = {
  id: number
  message: string
  createdAt: number
}

export const ToastProvider = ({ children }: Props) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)
  const notify = (message: string) => {
    const toast = {
      id: nextId.current++,
      message,
      createdAt: Date.now(),
    }
    setToasts(prevToasts => [...prevToasts, toast])

    // Remove the toast after 3 seconds
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(t => t.id !== toast.id))
    }, 3000)
  }
  const { t } = useTranslation()

  return (
    <ToastContext.Provider
      value={{
        notify,
      }}
    >
      {children}
      <div className='pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col space-y-2'>
        {toasts.map(toast => (
          <div
            key={toast.id}
            className='rounded bg-gray-800 px-4 py-2 text-white opacity-90 shadow-lg'
          >
            {t(toast.message)}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
