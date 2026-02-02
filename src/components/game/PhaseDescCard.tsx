import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useRoundStore } from '@/store/roundStore'
import type { Phase } from '@/types'
import Card from '../common/Card'

const PHASE_DESCRIPTIONS: Record<Phase, string> = {
  end: 'Waiting for players',
  keyword: 'Check your given word',
  drawing: 'Draw the keyword',
  discussion: 'Discuss with other players',
  voting: 'Vote for the Octopus',
  'vote-result': 'The Octopus reveals itself!',
  guessing: 'Octopus, make your guess',
  'round-result': 'Round result',
  'game-result': 'Game result',
}

export default function PhaseDescCard() {
  const { t } = useTranslation()
  const { phase } = useRoundStore()
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
