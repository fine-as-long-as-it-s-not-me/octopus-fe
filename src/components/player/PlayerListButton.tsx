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
      className={twMerge('max-w-[120px] grow self-stretch sm:hidden')}
      cardClassName='h-full'
      onClick={() => {
        openModal(<PlayerListModal />)
      }}
      aria-label='Open player list'
    >
      <Icon name='group' />
    </Button>
  )
}
