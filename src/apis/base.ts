import { useSocket } from '@/context/SocketContext'

export function useMutation<T extends Record<string, unknown> | void>(
  mainType: string,
  subType: string,
) {
  const { sendMessage } = useSocket()
  return {
    mutate: (data: T) => sendMessage(mainType, subType, data),
  }
}
