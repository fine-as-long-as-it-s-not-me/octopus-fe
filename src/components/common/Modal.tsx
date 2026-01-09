import { twMerge } from 'tailwind-merge'

import Card from './Card'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Modal({ children, className }: Props) {
  return (
    <Card
      className={twMerge(
        'm-2 flex flex-col gap-4 items-center justify-center w-fit',
        className,
      )}
    >
      {children}
    </Card>
  )
}
