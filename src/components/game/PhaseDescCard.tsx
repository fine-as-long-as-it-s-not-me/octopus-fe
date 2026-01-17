import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useRoom } from '@/context/RoomContext'
import Card from '../common/Card'

const PHASE_DESCRIPTIONS: Record<string, string> = {
  waiting: 'Waiting for players...',
  keyword: 'Check your given word',
  drawing: 'Draw!',
  discussion: 'Discuss with other players',
  voting: 'Vote for the suspicious...',
  'vote-result': 'See the voting results',
  guessing: 'Guess the correct word',
  result: 'See the round results',
}

export default function PhaseDescCard() {
  const { t } = useTranslation()
  const { phase } = useRoom()
  const phaseDescription = PHASE_DESCRIPTIONS[phase] || ''

  return (
    <Card
      size='md'
      className={twMerge(
        `order-1 w-auto shrink-0 grow-4 items-center sm:order-2`,
      )}
    >
      {t(phaseDescription)}
    </Card>
  )
}
