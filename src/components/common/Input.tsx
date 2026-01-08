interface Props {
  type?: string
  value?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function Input({
  type = 'text',
  value,
  placeholder,
  onChange,
  className,
}: Props) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`px-4 py-3 md:px-6 md:py-4 text-base md:text-lg bg-white/75 rounded-xl ${className}`}
    />
  )
}
