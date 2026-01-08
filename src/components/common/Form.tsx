interface Props {
  children?: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  className?: string
}

export default function Form({ children, onSubmit, className }: Props) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSubmit(e)
      }}
      className={className}
    >
      {children}
    </form>
  )
}
