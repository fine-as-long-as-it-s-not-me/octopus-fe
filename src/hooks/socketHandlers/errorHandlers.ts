import type { MessageHandlers } from '@/types'

type ErrorHandlersDeps = {
  toast: (message: string) => void
}

export const createErrorHandlers = ({
  toast,
}: ErrorHandlersDeps): Pick<MessageHandlers, 'error'> => ({
  error: ({ message }) => {
    toast(message)
  },
})
