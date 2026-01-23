import { useSocket } from '@/context/SocketContext'
import Button from '../common/Button'

export default function NextPhaseButton() {
  const { DEV_nextPhase } = useSocket()
  const handleClick = () => {
    DEV_nextPhase()
  }

  return (
    <Button onClick={handleClick} className='flex h-full w-fit'>
      ?
    </Button>
  )
}
