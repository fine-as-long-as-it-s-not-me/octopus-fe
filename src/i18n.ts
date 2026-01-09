import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import tranEn from './locales/en.json'
import tranKo from './locales/ko.json'

export const languages = ['en', 'ko'] as const

export type Languages = (typeof languages)[number] // 'en' | 'ko'

const resources = {
  en: { translation: tranEn },
  ko: { translation: tranKo },
}

const userLanguage = window.navigator.language

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || userLanguage || 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
