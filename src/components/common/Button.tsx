import type { MouseEvent, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { useEffects } from '@/context/EffectsContext'
import Card from './Card'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  children?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  active?: boolean
  cardClassName?: string
}

export default function Button({
  icon,
  size = 'lg',
  className,
  onClick,
  disabled,
  children,
  active = false,
  cardClassName,
  ...rest
}: Props) {
  const { playSoundEffect } = useEffects()
  const sizeCardClassName = {
    sm: 'px-5 py-3 md:px-6 md:py-3',
    md: 'px-6 py-3 md:px-8 md:py-4',
    lg: 'px-8 py-4 md:px-10 md:py-5',
  }
  const defaultClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    playSoundEffect(disabled ? 'toong' : size == 'lg' ? 'chung' : 'ddok!')
  }

  return (
    <button
      onClick={e => {
        defaultClickHandler(e)
        onClick?.()
      }}
      disabled={disabled}
      className={twMerge(
        'shrink-0 bg-transparent overflow-hidden',
        size === 'sm' ? 'w-fit' : 'w-full',
        className,
      )}
      {...rest}
    >
      <Card
        size={size}
        className={twMerge(
          'active:scale-95 transition-transform flex items-center justify-center gap-4',
          sizeCardClassName[size],
          active ? 'bg-black/75 text-white' : '',
          cardClassName,
        )}
      >
        {icon}
        {children}
      </Card>
    </button>
  )
}
