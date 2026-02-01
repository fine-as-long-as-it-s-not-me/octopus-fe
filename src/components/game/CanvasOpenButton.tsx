import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'

import Button from '../common/Button'
import Icon from '../common/Icon'
import Canvas from './Canvas'

export default function CanvasOpenButton() {
  const { openModal } = useModal()
  const { t } = useTranslation()
  return (
    <Button
      size='md'
      className='absolute bottom-20 left-6 z-50'
      cardClassName='items-center gap-1 flex-col justify-center rounded-xl'
      onClick={() => {
        openModal(<Canvas />)
      }}
    >
      <Icon name='imagesmode' />
      <p className='break-keep'>{t('View Canvas')}</p>
    </Button>
  )
}
