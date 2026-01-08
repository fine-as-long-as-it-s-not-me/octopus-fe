interface Props {
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
}

export default function Card({ size = 'lg', children, className }: Props) {
  return (
    <div
      className={`rounded-full bg-white/25 border border-white/45 backdrop-blur-[3px] ${className}
        ${size === 'sm' ? 'text-sm md:text-base' : size === 'md' ? 'text-lg' : 'text-lg'}
        ${size === 'sm' ? 'rounded-full' : size === 'md' ? 'rounded-2xl' : 'rounded-xl'}
        ${size === 'sm' ? 'px-5 py-3 md:px-6 md:py-3' : size === 'md' ? 'px-6 py-3 md:px-8 md:py-4' : 'px-8 py-4 md:px-10 md:py-5'}
        ${size === 'sm' ? 'w-fit' : 'w-full'}
      `}
    >
      {children}
    </div>
  )
}
