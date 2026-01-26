import type { Language } from '@/i18n'

export function parseCountryCodeToLang(code: Language): string {
  switch (code) {
    case 'en':
      return 'English'
    case 'ko':
      return 'Korean'
    default:
      return 'Unknown Country'
  }
}
