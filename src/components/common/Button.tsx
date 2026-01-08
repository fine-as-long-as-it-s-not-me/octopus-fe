import type { ReactNode } from 'react'

import { useEffects } from '@/context/EffectsContext'
import Card from './Card'

interface Props {
  icon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  children?: ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  icon,
  type = 'button',
  size = 'lg',
  className,
  onClick,
  disabled,
  children,
}: Props) {
  const { playSoundEffect } = useEffects()
  return (
    <button
      type={type}
      onClick={e => {
        e.stopPropagation()
        onClick?.()
        playSoundEffect(disabled ? 'toong' : size == 'lg' ? 'chung' : 'ddok!')
      }}
      disabled={disabled}
      className={`shrink-0 bg-transparent overflow-hidden
          ${size === 'sm' ? 'w-fit' : 'w-full'} ${className}
        `}
    >
      <Card
        size={size}
        className={`lg:w-auto active:scale-95 transition-transform flex items-center justify-center gap-4`}
      >
        {icon}
        {children}
      </Card>
    </button>
  )
}
