import { useSocket } from '@/context/SocketContext'
import Button from '../common/Button'

export default function NextPhaseButton() {
  const { nextPhase } = useSocket()
  const handleClick = () => {
    nextPhase()
  }

  return (
    <Button onClick={handleClick} className='flex h-full w-fit'>
      ?
    </Button>
  )
}
