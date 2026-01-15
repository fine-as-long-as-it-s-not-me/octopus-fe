import { useModal } from 'sam-react-modal'

import Button from './Button'
import Icon from './Icon'
import SettingButtonsModal from './SettingButtonsModal'

export default function SettingModalButton() {
  const { openModal } = useModal()
  return (
    <Button
      className='w-fit grow sm:grow-0'
      cardClassName='h-full'
      onClick={() => {
        openModal(<SettingButtonsModal />)
      }}
    >
      <Icon name='settings' />
    </Button>
  )
}
