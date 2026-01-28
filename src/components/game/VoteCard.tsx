import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import Button from '@/components/common/Button'
import Profile from '@/components/player/Profile'
import { useRoomStore } from '@/store/roomStore'
import { useRoundStore } from '@/store/roundStore'

interface Props {
  onSubmit?: (votedPlayerUUID: string) => void
}

export default function VoteCard({ onSubmit }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [voted, setVoted] = useState<boolean>(false)
  const { timeLeft, voteResult } = useRoundStore()
  const { players } = useRoomStore()
  const { t } = useTranslation()

  useEffect(() => {
    if (timeLeft === 0 && !voted && selected && onSubmit) onSubmit(selected)
  }, [timeLeft, voted, selected, onSubmit])

  return (
    <div className='flex flex-col items-center gap-2'>
      <h2>{t("Who's the Octopus?")}</h2>
      <div className='grid grid-cols-6 gap-2'>
        {players.map(player => (
          <Button
            key={player.UUID}
            size='sm'
            cardClassName={twMerge(
              'flex flex-row gap-2 items-center justify-between',
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
          onClick={() => {
            if (selected) {
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
