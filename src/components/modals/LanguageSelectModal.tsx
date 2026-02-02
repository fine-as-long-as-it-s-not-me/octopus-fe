import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'

import { useChangeLanguage } from '@/apis/player'
import { LANGUAGE_LABELS } from '@/consts'
import { languages, type Language } from '@/i18n'
import { useUserStore } from '@/store/userStore'
import Button from '../common/Button'
import Modal from '../common/Modal'

export default function LanguageSelectModal() {
  const { t, i18n } = useTranslation()
  const { closeModal } = useModal()
  const { setLang } = useUserStore()
  const { mutate } = useChangeLanguage()

  const handleChangeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang)
    setLang(lang)
    mutate({ lang })
    window.location.reload()
  }

  return (
    <Modal className='min-w-[400px]'>
      <p>{t('Change Village')}</p>
      <p className='text-base text-black/80'>
        {t('The server differs by selected village.')}
      </p>
      {languages.map(lang => (
        <Button
          key={lang}
          onClick={() => {
            handleChangeLanguage(lang)
            closeModal()
          }}
        >
          {LANGUAGE_LABELS[lang]}
        </Button>
      ))}
    </Modal>
  )
}
