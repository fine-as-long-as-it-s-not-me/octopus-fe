interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Modal({ children, className }: Props) {
  return (
    <div
      className={`flex flex-col p-4 items-center justify-center rounded-2xl bg-white ${className}`}
    >
      {children}
    </div>
  )
}
