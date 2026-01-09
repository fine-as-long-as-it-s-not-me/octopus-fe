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
        className={`lg:w-auto active:scale-95 transition-transform flex items-center justify-center gap-4
        ${size === 'sm' ? 'px-5 py-3 md:px-6 md:py-3' : size === 'md' ? 'px-6 py-3 md:px-8 md:py-4' : 'px-8 py-4 md:px-10 md:py-5'}
          `}
      >
        {icon}
        {children}
      </Card>
    </button>
  )
}
