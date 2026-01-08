import { useModal } from 'sam-react-modal'
import Button from './Button'
import Modal from './Modal'

interface Props {
  children: React.ReactNode
}

export default function AlertModal({ children }: Props) {
  const { closeModal } = useModal()
  return (
    <Modal>
      <p>AlertModal</p>
      <p>{children}</p>
      <Button onClick={() => closeModal()}>Okay</Button>
    </Modal>
  )
}
