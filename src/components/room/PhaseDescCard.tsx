import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useRoom } from '@/context/RoomContext'
import Card from '../common/Card'

interface Props {
  className?: string
}

export default function PhaseDescCard({ className }: Props) {
  const { t } = useTranslation()
  const { phaseDescription } = useRoom()

  return (
    <Card
      size='md'
      className={twMerge(`w-auto grow-4 items-center`, className)}
    >
      {t(phaseDescription)}
    </Card>
  )
}
