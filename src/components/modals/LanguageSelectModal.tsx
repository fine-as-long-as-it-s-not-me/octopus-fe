import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'

import { languages, type Language } from '@/i18n'
import { useUserStore } from '@/store/userStore'
import Button from '../common/Button'
import Modal from '../common/Modal'

export default function LanguageSelectModal() {
  const { t, i18n } = useTranslation()
  const { closeModal } = useModal()
  const { setLang } = useUserStore()

  const handleChangeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang)
    setLang(lang)
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
