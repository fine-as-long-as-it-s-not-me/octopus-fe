import type { Stroke } from '@/types'
import { useMutation } from './base'

export function useAddStroke() {
  return useMutation<{ stroke: Stroke }>('draw', 'add')
}

export function useBgColor() {
  return useMutation<{ color: string }>('draw', 'background')
}
