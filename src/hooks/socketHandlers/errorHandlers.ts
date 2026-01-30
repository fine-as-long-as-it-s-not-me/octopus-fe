import type { MessageHandlers } from '@/types'

type ErrorHandlersDeps = {
  notify: (message: string) => void
}

export const createErrorHandlers = ({
  notify,
}: ErrorHandlersDeps): Pick<MessageHandlers, 'error'> => ({
  error: ({ message }) => {
    notify(message)
  },
})
