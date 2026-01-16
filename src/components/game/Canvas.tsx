import { useRoom } from '@/context/RoomContext'

export default function Canvas() {
  const { strokes } = useRoom()
  return <div className='block aspect-square w-full bg-black'>Canvas</div>
}
