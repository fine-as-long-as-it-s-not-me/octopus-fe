import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'

import { languages, type Languages } from '@/i18n'
import Button from '../common/Button'
import Modal from '../common/Modal'

export default function LanguageSelectModal() {
  const { t, i18n } = useTranslation()
  const { closeModal } = useModal()

  const handleChangeLanguage = (lang: Languages) => {
    i18n.changeLanguage(lang)
  }

  return (
    <Modal className='min-w-[400px]'>
      <p>{t('languages')}</p>
      {languages.map(lang => (
        <Button
          key={lang}
          onClick={() => {
            handleChangeLanguage(lang)
            closeModal()
          }}
        >
          {t(lang)}
        </Button>
      ))}
    </Modal>
  )
}
