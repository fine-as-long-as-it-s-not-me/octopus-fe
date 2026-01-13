import Button from '../common/Button'
import Modal from '../common/Modal'

interface Props {
  children: React.ReactNode
}

export default function Confirm({ children }: Props) {
  return (
    <Modal>
      {children}
      <div className='flex flex-row justify-between'>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </div>
    </Modal>
  )
}
