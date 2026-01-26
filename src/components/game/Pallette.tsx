import { useTranslation } from 'react-i18next'

import { useGameStore } from '@/store/gameStore'
import Button from '../common/Button'
import Card from '../common/Card'
import Icon from '../common/Icon'

const COLORS = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#000000',
  '#FFFFFF',
]

export default function Pallette() {
  const { t } = useTranslation()
  return (
    <Card className='flex flex-row items-center justify-between gap-4 p-4'>
      <div className='grid grid-cols-4 gap-2'>
        {COLORS.map(color => (
          <Ink key={color} color={color} />
        ))}
      </div>
      <div className='flex gap-4'>
        <Button size='sm' cardClassName='h-16 w-16'>
          <Icon name='pen_size_4' size={32} />
        </Button>
        <Button size='sm' cardClassName='h-16 w-16'>
          <Icon name='ink_eraser' size={32} />
        </Button>
      </div>
      <Button size='md' className='h-full' cardClassName='h-full'>
        {t('Canvas Color')}
      </Button>
    </Card>
  )
}

interface InkProps {
  color: string
}

function Ink({ color }: InkProps) {
  const { setStrokeColor } = useGameStore()

  return (
    <button
      className={`h-12 w-12 rounded-full`}
      style={{ backgroundColor: color }}
      onClick={() => setStrokeColor(color)}
    ></button>
  )
}
