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
    md: 'gap-1',
  }
  return (
    <div
      className={twMerge(
        `m-[-2px] flex shrink-0 items-center`,
        sizeClassName[size],
      )}
    >
      <Img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className={size === 'sm' ? 'h-12 w-12' : 'h-14 w-14'}
      />
      {name}
    </div>
  )
}
