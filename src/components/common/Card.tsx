import { twMerge } from 'tailwind-merge'

import { useWindow } from '@/context/WindowContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
}

export default function Card({ size = 'lg', children, className }: Props) {
  const { isCompact } = useWindow()

  const sizeClassName = {
    sm: `text-sm md:text-base w-fit px-2.5 py-2 rounded-[24px]`,
    md: `text-lg w-full p-3 md:p-4 ${isCompact ? 'sm:rounded-2xl' : 'rounded-2xl'}`,
    lg: `text-lg w-full p-3 md:p-4 ${isCompact ? 'sm:rounded-xl' : 'rounded-xl'}`,
  }
  return (
    <div
      className={twMerge(
        `flex overflow-hidden border border-white/45 bg-white/70 backdrop-blur-[3px]`,
        sizeClassName[size],
        className,
      )}
    >
      {children}
    </div>
  )
}
