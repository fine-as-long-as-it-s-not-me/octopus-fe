import { useTranslation } from 'react-i18next'

import { useRoom } from '@/context/RoomContext'
import Card from '../common/Card'

export default function PhaseDescCard() {
  const { t } = useTranslation()
  const { phaseDescription } = useRoom()

  return (
    <Card size='md' className='w-auto grow-4 items-center'>
      {t(phaseDescription)}
    </Card>
  )
}
