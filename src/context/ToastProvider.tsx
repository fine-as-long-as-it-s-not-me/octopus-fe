import { createRef, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { useSound } from './SoundContext'
import { ToastContext } from './ToastContext'

type Props = { children: ReactNode }

type Toast = {
  id: number
  message: string
  createdAt: number
  ref: React.RefObject<HTMLDivElement>
}

export const ToastProvider = ({ children }: Props) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)
  const { playSoundEffect } = useSound()

  const notify = (message: string) => {
    const toast = {
      id: nextId.current++,
      message,
      createdAt: Date.now(),
      ref: createRef<HTMLDivElement>(),
    } as Toast
    setToasts(prevToasts => [...prevToasts, toast])
    playSoundEffect('notify')

    // Remove the toast after 3 seconds
    setTimeout(() => {
      toast.ref.current?.classList.add('fade-out')
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(t => t.id !== toast.id))
      }, 500)
    }, 2000)
  }

  const { t } = useTranslation()

  return (
    <ToastContext.Provider
      value={{
        notify,
      }}
    >
      {children}
      <div className='pointer-events-none fixed right-4 bottom-4 z-1050 flex flex-col space-y-2'>
        {toasts.map(toast => (
          <div
            key={toast.id}
            ref={toast.ref}
            className='fade-in rounded bg-gray-800 px-4 py-2 text-white opacity-0 shadow-lg transition duration-500'
          >
            {t(toast.message)}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
