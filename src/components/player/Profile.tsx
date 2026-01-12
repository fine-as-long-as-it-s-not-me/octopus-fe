import { twMerge } from 'tailwind-merge'

import useAvatar from '@/hooks/useAvatar'
import Card from '../common/Card'
import Img from '../common/Img'

interface Props {
  name: string
  size: 'sm' | 'md'
}

export default function Profile({ name, size = 'md' }: Props) {
  const avatarUrl = useAvatar(name)
  const sizeClassName = {
    sm: 'gap-0',
    md: 'gap-2',
  }
  return (
    <div
      className={twMerge(
        `m-[-2px] flex w-fit grow items-center rounded-full`,
        sizeClassName[size],
      )}
    >
      {size === 'md' ? (
        <Card size='sm' className='p-0 md:p-0'>
          <Img src={avatarUrl} alt={`${name}'s avatar`} className='h-16 w-16' />
        </Card>
      ) : (
        <Img src={avatarUrl} alt={`${name}'s avatar`} className='h-12 w-12' />
      )}
      {name}
    </div>
  )
}
