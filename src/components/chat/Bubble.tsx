import { twMerge } from 'tailwind-merge'

import { useUserStore } from '@/store/userStore'
import type { Player } from '@/types'
import Card from '../common/Card'
import Profile from '../player/Profile'

interface Props {
  author: Player
  message: string
}

export default function Bubble({ author, message }: Props) {
  const { name } = useUserStore()

  const isMe = author.name === name

  return (
    <div
      className={twMerge(
        'w-fit px-4 py-1 md:py-2',
        isMe ? 'flex flex-col items-end self-end' : '',
      )}
    >
      <Profile name={author.name} size='sm' />
      <Card size='sm' className='rounded-full px-4 py-2 md:py-2'>
        <p>{message}</p>
      </Card>
    </div>
  )
}
