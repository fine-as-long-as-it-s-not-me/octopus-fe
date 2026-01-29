import Modal from './Modal'
import SettingButtons from './SettingButtons'

interface Props {
  translate?: boolean
}

export default function SettingButtonsModal({ translate = true }: Props) {
  return (
    <Modal className='flex-row'>
      <SettingButtons className='rounded-xl' translate={translate} />
    </Modal>
  )
}
