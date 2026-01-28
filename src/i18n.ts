import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import tranKo from './locales/ko.json'

export const languages = ['en', 'ko'] as const

export type Language = (typeof languages)[number] // 'en' | 'ko'

const resources = {
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

i18n.on('languageChanged', (lng: string) => {
  try {
    localStorage.setItem('language', lng)
  } catch (e) {
    console.error('Failed to save language preference to localStorage.', e)
  }
})

export default i18n
