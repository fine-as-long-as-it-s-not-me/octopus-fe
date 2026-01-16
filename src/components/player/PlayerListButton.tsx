import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import Button from '../common/Button'
import Icon from '../common/Icon'
import PlayerListModal from './PlayerListModal'

export default function PlayerListButton() {
  const { openModal } = useModal()
  return (
    <Button
      size='md'
      className={twMerge('grow self-stretch sm:hidden sm:grow-0')}
      cardClassName='h-full'
      onClick={() => {
        openModal(<PlayerListModal />)
      }}
    >
      <Icon name='group' />
    </Button>
  )
}
