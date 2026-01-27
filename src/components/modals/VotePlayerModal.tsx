import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useRoomStore } from '@/store/roomStore'
import Button from '../common/Button'
import Modal from '../common/Modal'
import Profile from '../player/Profile'

interface Props {
  onSubmit: (playerId: string) => void
}

export default function VotePlayerModal({ onSubmit }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const { players } = useRoomStore()

  const selectHandler = (playerId: string) => {
    setSelected(playerId)
  }
  return (
    <Modal>
      <div className='flex w-full flex-col gap-4'>
        <h2 className='text-center text-2xl font-bold'>Vote for a Player</h2>
        <div className='flex w-full flex-row flex-wrap gap-2'>
          {players.map(player => (
            <Button
              key={player.UUID}
              size='sm'
              cardClassName={twMerge(
                'hover:bg-red-100',
                selected === player.UUID ? 'border-4 border-red-400' : '',
              )}
              onClick={() => {
                if (selected === player.UUID) setSelected(null)
                else selectHandler(player.UUID)
              }}
            >
              <Profile name={player.name} size='sm' />
            </Button>
          ))}
        </div>
        <Button
          cardClassName={twMerge(
            'rounded-xl bg-gray-600 text-white hover:bg-gray-700',
            !selected ? 'cursor-not-allowed opacity-50' : '',
          )}
          onClick={() => {
            if (selected) onSubmit(selected)
          }}
          disabled={!selected}
        >
          Vote
        </Button>
      </div>
    </Modal>
  )
}
