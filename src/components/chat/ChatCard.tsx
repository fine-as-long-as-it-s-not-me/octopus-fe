import Card from '../common/Card'
import Bubble from './Bubble'

const mockAuthor = { name: 'Alice', id: '1' }
const mockMessage = 'Hello, this is a sample message!'

export default function ChatCard() {
  return (
    <Card className='flex w-[320px] grow-1'>
      <Bubble author={mockAuthor} message={mockMessage} />
    </Card>
  )
}
