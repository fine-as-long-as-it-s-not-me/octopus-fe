import { useModal } from 'sam-react-modal'

import Button from '../common/Button'
import Modal from '../common/Modal'

interface Props {
  children: React.ReactNode
}

export default function Confirm({ children }: Props) {
  const { closeModal } = useModal()
  return (
    <Modal>
      {children}
      <div className='mt-4 flex flex-row items-center justify-between gap-4'>
        <Button
          size='md'
          onClick={() => {
            closeModal(false)
          }}
        >
          Cancel
        </Button>
        <Button
          size='md'
          onClick={() => {
            closeModal(true)
          }}
        >
          Ok
        </Button>
      </div>
    </Modal>
  )
}
