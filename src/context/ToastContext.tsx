import { createContext, useContext } from 'react'

type ToastContextType = {
  toast: (message: string) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
