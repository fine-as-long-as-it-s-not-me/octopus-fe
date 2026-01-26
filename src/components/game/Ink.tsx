import { twMerge } from 'tailwind-merge'

import { useGameStore } from '@/store/gameStore'

interface Props {
  color: string
  onClick: () => void
}

export default function Ink({ color, onClick }: Props) {
  const { strokeColor } = useGameStore()

  return (
    <button
      className={twMerge(
        `h-12 w-12 rounded-full`,
        strokeColor === color && 'ring-4 ring-gray-400',
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
    ></button>
  )
}
