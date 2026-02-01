import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import { COLORS } from '@/consts'
import { useWindow } from '@/context/WindowContext'
import { useRoundStore } from '@/store/roundStore'
import Button from '../common/Button'
import Card from '../common/Card'
import Icon from '../common/Icon'
import CanvasColorModal from '../modals/CanvasColorModal'
import StrokeWidthModal from '../modals/StrokeWidthModal'
import Ink from './Ink'

export default function Palette() {
  const { t } = useTranslation()
  const { tool, setTool, setStrokeColor } = useRoundStore()
  const { openModal } = useModal()
  const { direction } = useWindow()

  return (
    <Card
      className={twMerge(
        'flex h-fit flex-row flex-wrap items-center justify-center gap-4 p-4',
        direction === 'vertical' ? 'w-full' : 'h-fit',
      )}
    >
      <div className='grid grid-cols-5 gap-2'>
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
      <div className='flex justify-around gap-2'>
        <Button
          size='sm'
          cardClassName='h-14 w-14'
          onClick={() => {
            if (tool === 'pen') openModal(<StrokeWidthModal />)
            else setTool('pen')
          }}
          aria-label='Adjust pen size'
        >
          <Icon name='pen_size_4' size={32} />
        </Button>
        <Button
          size='sm'
          cardClassName='h-14 w-14'
          onClick={() => {
            if (tool === 'eraser') openModal(<StrokeWidthModal />)
            else setTool('eraser')
          }}
          aria-label='Eraser'
        >
          <Icon name='ink_eraser' size={32} />
        </Button>
      </div>
      <Button
        size='md'
        cardClassName='rounded-2xl p-3'
        onClick={() => openModal(<CanvasColorModal />)}
      >
        {t('Canvas Color')}
      </Button>
    </Card>
  )
}
