import { twMerge } from 'tailwind-merge'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  shape?: 'sm' | 'md'
}

export default function Input({
  type = 'text',
  className,
  shape = 'md',
  value,
  onClick,
  ...rest
}: Props) {
  const shapeClassName = {
    sm: 'px-3 py-1.5 md:px-4 md:py-2',
    md: 'px-4 py-3 md:px-6 md:py-4',
  }
  return (
    <input
      type={type}
      value={value}
      onClick={onClick}
      className={twMerge(
        'h-fit text-base md:text-lg bg-white/75 rounded-xl',
        shapeClassName[shape],
        className,
      )}
      {...rest}
    />
  )
}
