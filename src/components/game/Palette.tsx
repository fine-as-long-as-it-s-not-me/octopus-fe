import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'

import { COLORS } from '@/consts'
import { useGameStore } from '@/store/gameStore'
import Button from '../common/Button'
import Card from '../common/Card'
import Icon from '../common/Icon'
import CanvasColorModal from '../modals/CanvasColorModal'
import StrokeWidthModal from '../modals/StrokeWidthModal'
import Ink from './Ink'

export default function Palette() {
  const { t } = useTranslation()
  const { setTool, setStrokeColor } = useGameStore()
  const { openModal } = useModal()

  return (
    <Card className='flex flex-row items-center justify-between gap-4 p-4'>
      <div className='grid grow-4 grid-cols-4 gap-2'>
        {COLORS.map(color => (
          <Ink
            key={color}
            color={color}
            onClick={() => {
              setTool('pen')
              setStrokeColor(color)
            }}
          />
        ))}
      </div>
      <div className='flex grow-1 justify-between gap-4'>
        <Button
          size='sm'
          cardClassName='h-16 w-16'
          onClick={() => {
            setTool('pen')
            openModal(<StrokeWidthModal />)
          }}
        >
          <Icon name='pen_size_4' size={32} />
        </Button>
        <Button
          size='sm'
          cardClassName='h-16 w-16'
          onClick={() => setTool('eraser')}
        >
          <Icon name='ink_eraser' size={32} />
        </Button>
      </div>
      <Button
        size='md'
        className='h-full grow-4'
        cardClassName='h-full w-full'
        onClick={() => openModal(<CanvasColorModal />)}
      >
        {t('Canvas Color')}
      </Button>
    </Card>
  )
}
