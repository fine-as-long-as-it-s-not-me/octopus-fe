import { twMerge } from 'tailwind-merge'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
}

export default function Card({ size = 'lg', children, className }: Props) {
  const sizeClassName = {
    sm: 'text-sm md:text-base rounded-full w-fit',
    md: 'text-lg rounded-2xl w-full',
    lg: 'text-lg rounded-xl w-full',
  }
  return (
    <div
      className={twMerge(
        'rounded-full bg-white/25 border border-white/45 backdrop-blur-[3px] p-4',
        sizeClassName[size],
        className,
      )}
    >
      {children}
    </div>
  )
}
