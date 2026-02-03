import type { ChangeableSettings } from '@/types'
import { useMutation } from './base'

export function useCreateRoom() {
  return useMutation<{ settings: ChangeableSettings }>('room', 'create')
}

export function useJoinRoom() {
  return useMutation<{ roomCode: string; UUID: string }>('room', 'join')
}

export function useJoinPrivateRoom() {
  return useMutation<{ roomCode: string; UUID: string }>('room', 'join_private')
}

export function useJoinRandomRoom() {
  return useMutation<{ UUID: string }>('room', 'join_random')
}

export function useChangeRoomSettings() {
  return useMutation<{ settings: Partial<ChangeableSettings> }>(
    'room',
    'change_settings',
  )
}

export function useLeaveRoom() {
  return useMutation<{ roomCode: string }>('room', 'leave')
}

export function useVoteCustomKeyword() {
  return useMutation<{ keyword: string }>('room', 'vote_keyword')
}

export function useJoinRoomAnonymous() {
  return useMutation<{ roomCode: string }>('room', 'join_anonymous')
}

export function useVoteCustomKeywordAnonymous() {
  return useMutation<{ roomCode: string; keyword: string; UUID: string }>(
    'room',
    'vote_keyword_anonymous',
  )
}

export function useDeleteCustomKeyword() {
  return useMutation<{ keyword: string }>('room', 'delete_keyword')
}
