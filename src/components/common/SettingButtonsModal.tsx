import Modal from './Modal'
import SettingButtons from './SettingButtons'

export default function SettingButtonsModal() {
  return (
    <Modal className='flex-row'>
      <SettingButtons className='rounded-xl' />
    </Modal>
  )
}
