import type { Player } from '@/types'
import Card from '../common/Card'
import Profile from '../player/Profile'

interface Props {
  author: Player
  message: string
}

export default function Bubble({ author, message }: Props) {
  return (
    <div className='px-4 py-1 md:py-2'>
      <Profile name={author.name} size='sm' />
      <Card size='sm' className='px-4 py-2 md:py-2'>
        <p>{message}</p>
      </Card>
    </div>
  )
}
