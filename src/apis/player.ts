import { useMutation } from './base'

export function useLogin() {
  return useMutation<{ name: string; UUID: string; lang: string }>(
    'player',
    'login',
  )
}

export function useChangeLanguage() {
  return useMutation<{ lang: string }>('player', 'change_language')
}
