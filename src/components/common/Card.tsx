interface Props {
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
}

export default function Card({ size = 'lg', children, className }: Props) {
  return (
    <div
      className={`rounded-full bg-white/25 border border-white/45 backdrop-blur-[3px] p-4
        ${size === 'sm' ? 'text-sm md:text-base' : size === 'md' ? 'text-lg' : 'text-lg'}
        ${size === 'sm' ? 'rounded-full' : size === 'md' ? 'rounded-2xl' : 'rounded-xl'}
        ${size === 'sm' ? 'w-fit' : 'w-full'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
