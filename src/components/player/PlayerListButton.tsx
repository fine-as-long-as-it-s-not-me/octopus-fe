import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import { useWindow } from '@/context/WindowContext'
import Button from '../common/Button'
import Icon from '../common/Icon'
import PlayerListModal from './PlayerListModal'

export default function PlayerListButton() {
  const { openModal } = useModal()
  const { direction } = useWindow()
  return (
    <Button
      size='md'
      className={twMerge(
        'max-w-[120px] grow self-stretch',
        direction === 'vertical' ? '' : 'hidden',
      )}
      cardClassName={twMerge('h-full')}
      onClick={() => {
        openModal(<PlayerListModal />)
      }}
      aria-label='Open player list'
    >
      <Icon name='group' />
    </Button>
  )
}
