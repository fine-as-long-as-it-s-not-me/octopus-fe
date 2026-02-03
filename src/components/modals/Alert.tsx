import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'

import Button from '../common/Button'
import Modal from '../common/Modal'

interface Props {
  children: React.ReactNode
}

export default function Alert({ children }: Props) {
  const { closeModal } = useModal()
  const { t } = useTranslation()

  return (
    <Modal>
      <div className='flex grow items-center justify-center p-2 pb-0'>
        {children}
      </div>
      <Button
        cardClassName='rounded-xl'
        onClick={() => {
          closeModal()
        }}
        size='md'
      >
        {t('OK')}
      </Button>
    </Modal>
  )
}
