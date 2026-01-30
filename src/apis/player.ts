import { useMutation } from './base'

export function useLogin() {
  return useMutation<{ name: string; UUID: string; lang: string }>(
    'player',
    'login',
  )
}
