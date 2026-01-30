import { useMutation } from './base'

export function useSendChat() {
  return useMutation<{ text: string }>('chat', 'send')
}
