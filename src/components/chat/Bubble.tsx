import { twMerge } from 'tailwind-merge'

import { useUserStore } from '@/store/userStore'
import type { Player } from '@/types'
import Card from '../common/Card'
import Profile from '../player/Profile'

interface Props {
  player: Player
  text: string
}

export default function Bubble({ player, text }: Props) {
  const { name } = useUserStore()

  const isMe = player.name === name

  return (
    <div
      className={twMerge(
        'w-[100%] px-4 py-1 md:py-2',
        isMe ? 'flex flex-col items-end self-end' : '',
      )}
    >
      <Profile name={player.name} size='sm' />
      <Card size='sm' className='max-w-[70%] rounded-2xl px-4 py-2 md:py-2'>
        <p className='break-all'>{text}</p>
      </Card>
    </div>
  )
}
