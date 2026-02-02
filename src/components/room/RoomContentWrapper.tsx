import { twMerge } from 'tailwind-merge'

import { useWindow } from '@/context/WindowContext'

export default function RoomContentWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { direction } = useWindow()

  return (
    <div
      className={twMerge(
        'flex h-full w-full items-stretch sm:gap-2',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
      )}
    >
      {children}
    </div>
  )
}
