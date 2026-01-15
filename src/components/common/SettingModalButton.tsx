import { useModal } from 'sam-react-modal'

import Button from './Button'
import Icon from './Icon'
import SettingButtonsModal from './SettingButtonsModal'

export default function SettingModalButton() {
  const { openModal } = useModal()
  return (
    <Button
      className='w-fit sm:hidden'
      onClick={() => {
        openModal(<SettingButtonsModal />)
      }}
    >
      <Icon name='settings' />
    </Button>
  )
}
