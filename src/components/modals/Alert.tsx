import { useModal } from 'sam-react-modal'

import Button from '../common/Button'
import Modal from '../common/Modal'

interface Props {
  children: React.ReactNode
}

export default function Alert({ children }: Props) {
  const { closeModal } = useModal()

  return (
    <Modal>
      <div className='flex grow items-center justify-center p-4'>
        {children}
      </div>
      <Button
        onClick={() => {
          closeModal()
        }}
        size='md'
      >
        Ok
      </Button>
    </Modal>
  )
}
