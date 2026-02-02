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
        'm-2 flex w-dvw flex-col items-center justify-center gap-4 overflow-visible py-8 sm:h-auto sm:w-fit md:p-6',
        className,
      )}
    >
      {children}
    </Card>
  )
}
