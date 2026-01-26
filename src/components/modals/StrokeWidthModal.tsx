import { MAX_STROKE_WIDTH, MIN_STROKE_WIDTH } from '@/consts'
import { useGameStore } from '@/store/gameStore'
import Modal from '../common/Modal'
import Ink from '../game/Ink'

export default function StrokeWidthModal() {
  const { strokeWidth, setStrokeWidth, strokeColor } = useGameStore()
  return (
    <Modal>
      <div className='flex flex-row justify-between gap-4'>
        <input
          type='range'
          min={MIN_STROKE_WIDTH}
          max={MAX_STROKE_WIDTH}
          defaultValue={strokeWidth}
          className='w-full'
          onChange={e => setStrokeWidth(Number(e.target.value))}
        />
        <Ink color={strokeColor} size={strokeWidth} />
      </div>
    </Modal>
  )
}
