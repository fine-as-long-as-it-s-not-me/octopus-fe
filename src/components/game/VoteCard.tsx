import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import Button from '@/components/common/Button'
import Profile from '@/components/player/Profile'
import { useRoomStore } from '@/store/roomStore'
import { useRoundStore } from '@/store/roundStore'
import Confirm from '../modals/Confirm'

interface Props {
  onSubmit?: (votedPlayerUUID: string) => void
}

export default function VoteCard({ onSubmit }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [voted, setVoted] = useState<boolean>(false)
  const { openModal } = useModal()
  const { timeLeft, voteResult } = useRoundStore()
  const { players } = useRoomStore()
  const { t } = useTranslation()
  const selectedName = players.find(p => p.UUID === selected)?.name

  useEffect(() => {
    if (timeLeft === 0 && !voted && selected && onSubmit) onSubmit(selected)
  }, [timeLeft, voted, selected, onSubmit])

  return (
    <div className='flex flex-col items-center gap-2'>
      <h2>{onSubmit ? t("Who's the Octopus?") : t('Vote Results')}</h2>
      <div className='flex max-w-xl flex-wrap gap-2'>
        {players.map(player => (
          <Button
            key={player.UUID}
            size='sm'
            cardClassName={twMerge(
              'flex flex-row gap-2 items-center justify-between py-1.5 md:py-2',
              !voted && onSubmit ? 'hover:bg-red-100' : '',
              selected === player.UUID ? 'border-4 border-red-400' : '',
            )}
            onClick={() => {
              if (selected === player.UUID) setSelected(null)
              else setSelected(player.UUID)
            }}
            disabled={voted || !onSubmit}
          >
            <Profile name={player.name} size='sm' />
            {voteResult && voteResult[player.UUID] != null && (
              <span>{voteResult[player.UUID]}</span>
            )}
          </Button>
        ))}
      </div>
      {onSubmit && (
        <Button
          cardClassName={twMerge(
            'rounded-xl bg-gray-600 text-white',
            !voted ? 'hover:bg-gray-700' : '',
            !selected ? 'cursor-not-allowed opacity-50' : '',
          )}
          onClick={async () => {
            if (
              selected &&
              (await openModal(
                <Confirm>{t('Voting ') + selectedName}</Confirm>,
              ))
            ) {
              onSubmit(selected)
              setVoted(true)
            }
          }}
          disabled={!selected || voted}
        >
          {voted
            ? `${t('Voted for')} ${players.find(player => player.UUID === selected)?.name}`
            : t('Vote')}
        </Button>
      )}
    </div>
  )
}
