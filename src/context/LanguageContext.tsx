import { createContext, useContext } from 'react'

type LanguageContextType = {
  language: 'kr' | 'en'
  setLanguage: (language: 'kr' | 'en') => void
}

export const languageContext = createContext<LanguageContextType | null>(null)

export const useLanguage = () => {
  const ctx = useContext(languageContext)
  if (!ctx) throw new Error('useLanguage must be used within AssetProvider')
  return ctx
}
