import { twMerge } from 'tailwind-merge'

import { useRoundStore } from '@/store/roundStore'

interface Props {
  color: string
  onClick?: () => void
  size?: number
}

export default function Ink({ color, onClick, size }: Props) {
  const { strokeColor } = useRoundStore()

  return (
    <button
      className={twMerge(
        `aspect-square h-10 w-10 rounded-full lg:h-12 lg:w-12`,
        strokeColor === color && 'ring-4 ring-gray-400',
      )}
      style={{
        backgroundColor: color,
        width: size ? size : undefined,
        height: size ? size : undefined,
      }}
      onClick={onClick}
      aria-label={color}
    ></button>
  )
}
