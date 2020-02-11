import { setupI18n } from '@lingui/core'

export { I18nContext } from './I18nContext'
export { I18nProvider } from './I18nProvider'
export { useI18n } from './useI18n'
export { useLanguage } from './useLanguage'
export { useLanguageCode } from './useLanguageCode'

export const i18n = setupI18n({
  language: 'en',
})
