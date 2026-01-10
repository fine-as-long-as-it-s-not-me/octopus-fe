import type { Player } from '@/types'
import Card from '../common/Card'

interface Props {
  author: Player
  message: string
}

export default function Bubble({ author, message }: Props) {
  return (
    <div>
      {author.name}
      <Card size='sm' className='py-2 md:py-2'>
        <p>{message}</p>
      </Card>
    </div>
  )
}
