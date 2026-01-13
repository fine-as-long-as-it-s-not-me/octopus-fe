import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
}

export default function Card({ size = 'lg', children, className }: Props) {
  const sizeClassName = {
    sm: 'text-sm md:text-base rounded-full w-fit px-2.5 py-2',
    md: 'text-lg rounded-2xl w-full px-3 py-2 md:px-4 md:py-3',
    lg: 'text-lg rounded-xl w-full p-3 md:p-4',
  }
  return (
    <div
      className={twMerge(
        `overflow-hidden rounded-full border border-white/45 bg-white/70 backdrop-blur-[3px]`,
        sizeClassName[size],
        className,
      )}
    >
      {children}
    </div>
  )
}
