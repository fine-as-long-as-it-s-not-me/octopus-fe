import type { MouseEvent, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSound } from '@/context/SoundContext'
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
  ref?: React.Ref<HTMLButtonElement>
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
  ref,
  ...rest
}: Props) {
  const { playSoundEffect } = useSound()
  const sizeButtonClassName = {
    sm: '',
    md: '',
    lg: 'w-full',
  }
  const sizeCardClassName = {
    sm: '',
    md: 'py-1.5 md:py-2',
    lg: '',
  }
  const defaultClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    playSoundEffect(disabled ? 'pubobob' : size === 'lg' ? 'lgButton' : 'pop')
  }

  return (
    <button
      onClick={e => {
        defaultClickHandler(e)
        onClick?.()
      }}
      disabled={disabled}
      className={twMerge(
        'shrink-0 overflow-hidden bg-transparent',
        sizeButtonClassName[size],
        className,
      )}
      ref={ref}
      {...rest}
    >
      <Card
        size={size}
        className={twMerge(
          'flex items-center justify-center gap-4 transition-transform sm:active:scale-95',
          active ? 'bg-black/75 text-white' : '',
          sizeCardClassName[size],
          cardClassName,
        )}
      >
        {icon}
        {children}
      </Card>
    </button>
  )
}
