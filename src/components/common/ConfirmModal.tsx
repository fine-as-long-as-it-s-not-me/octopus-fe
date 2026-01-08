import { useModal } from 'sam-react-modal'
import Button from './Button'
import Modal from './Modal'

interface Props {
  children: React.ReactNode
}

export default function ConfirmModal({ children }: Props) {
  const { closeModal } = useModal()

  return (
    <Modal>
      <p>ConfirmModal</p>
      {children}
      <Button
        onClick={() => {
          closeModal(false)
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={() => {
          closeModal(true)
        }}
      >
        Confirm
      </Button>
    </Modal>
  )
}
