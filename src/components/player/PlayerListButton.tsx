import { useModal } from 'sam-react-modal'

import Button from '../common/Button'
import Icon from '../common/Icon'
import PlayerListModal from './PlayerListModal'

export default function PlayerListButton() {
  const { openModal } = useModal()
  return (
    <Button
      size='md'
      className='self-stretch sm:hidden'
      cardClassName='h-full'
      onClick={() => {
        openModal(<PlayerListModal />)
      }}
    >
      <Icon name='group' />
    </Button>
  )
}
