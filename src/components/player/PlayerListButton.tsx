import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import Button from '../common/Button'
import Icon from '../common/Icon'
import PlayerListModal from './PlayerListModal'

interface Props {
  className?: string
}

export default function PlayerListButton({ className }: Props) {
  const { openModal } = useModal()
  return (
    <Button
      size='md'
      className={twMerge('grow self-stretch sm:hidden sm:grow-0', className)}
      cardClassName='h-full'
      onClick={() => {
        openModal(<PlayerListModal />)
      }}
    >
      <Icon name='group' />
    </Button>
  )
}
