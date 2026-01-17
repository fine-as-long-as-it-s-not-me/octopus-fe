import { useRoom } from '@/context/RoomContext'
import Button from '../common/Button'

export default function NextPhaseButton() {
  const { nextPhase } = useRoom()
  const handleClick = () => {
    nextPhase()
  }

  return (
    <Button onClick={handleClick} className='flex h-full w-fit'>
      ?
    </Button>
  )
}
