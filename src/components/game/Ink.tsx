import { twMerge } from 'tailwind-merge'

import { useGameStore } from '@/store/gameStore'

interface Props {
  color: string
  onClick?: () => void
  size?: number
}

export default function Ink({ color, onClick, size = 48 }: Props) {
  const { strokeColor } = useGameStore()

  return (
    <button
      className={twMerge(
        `aspect-square rounded-full`,
        strokeColor === color && 'ring-4 ring-gray-400',
      )}
      style={{ backgroundColor: color, width: size, height: size }}
      onClick={onClick}
    ></button>
  )
}
