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
        'm-2 flex w-fit flex-col items-center justify-center gap-4 md:p-6',
        className,
      )}
    >
      {children}
    </Card>
  )
}
