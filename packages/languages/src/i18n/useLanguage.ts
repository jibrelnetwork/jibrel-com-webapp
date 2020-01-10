import { useContext } from 'react'

import { I18nContext } from './I18nContext'
import { LanguageMeta } from '../data/languages'

export const useLanguage = (): LanguageMeta => {
  const { language } = useContext(I18nContext)

  return language
}
