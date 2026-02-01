import { twMerge } from 'tailwind-merge'

import { useRoundStore } from '@/store/roundStore'

interface Props {
  color: string
  onClick?: () => void
  size?: number
}

export default function Ink({ color, onClick }: Props) {
  const { strokeColor } = useRoundStore()

  return (
    <button
      className={twMerge(
        `aspect-square h-10 w-10 rounded-full sm:h-12 sm:w-12`,
        strokeColor === color && 'ring-4 ring-gray-400',
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
      aria-label={color}
    ></button>
  )
}
