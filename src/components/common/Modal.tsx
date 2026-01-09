import Card from './Card'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Modal({ children, className }: Props) {
  return (
    <Card
      size='sm'
      className={`flex flex-col gap-4 rounded-xl items-center ${className}`}
    >
      {children}
    </Card>
  )
}
