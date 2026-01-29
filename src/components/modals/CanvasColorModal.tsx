import { useModal } from 'sam-react-modal'

import { useBgColor } from '@/apis/canvas'
import { COLORS } from '@/consts'
import Modal from '../common/Modal'
import Ink from '../game/Ink'

export default function CanvasColorModal() {
  const { mutate: setBgColor } = useBgColor()
  const { closeModal } = useModal()
  return (
    <Modal>
      <div className='flex flex-row flex-wrap gap-4'>
        {COLORS.map(color => (
          <Ink
            key={color}
            color={color}
            onClick={() => {
              setBgColor(color)
              closeModal()
            }}
          />
        ))}
      </div>
    </Modal>
  )
}
