import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import Button from '../common/Button'
import Modal from '../common/Modal'

interface Props {
  children: React.ReactNode
}

export default function Confirm({ children }: Props) {
  const { closeModal } = useModal()
  const { t } = useTranslation()
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <Modal>
      {children}
      <div
        className={twMerge(
          'mt-4 flex flex-row items-center justify-between gap-4',
        )}
      >
        <Button
          size='md'
          onClick={() => {
            closeModal(false)
          }}
          className='rounded-xl'
        >
          {t('Cancel')}
        </Button>
        <Button
          ref={ref}
          size='md'
          onClick={() => {
            closeModal(true)
          }}
          className='rounded-xl'
        >
          {t('Ok')}
        </Button>
      </div>
    </Modal>
  )
}
