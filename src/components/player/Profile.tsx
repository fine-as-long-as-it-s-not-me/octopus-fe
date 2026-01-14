import { twMerge } from 'tailwind-merge'

import useAvatar from '@/hooks/useAvatar'
import Img from '../common/Img'

interface Props {
  name: string
  size?: 'sm' | 'md'
}

export default function Profile({ name, size = 'md' }: Props) {
  const avatarUrl = useAvatar(name)
  const sizeClassName = {
    sm: 'gap-0',
    md: 'gap-2',
  }
  return (
    <div className={twMerge(`m-[-2px] flex items-center`, sizeClassName[size])}>
      <Img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className={size === 'sm' ? 'h-12 w-12' : 'h-16 w-16'}
      />
      {name}
    </div>
  )
}
