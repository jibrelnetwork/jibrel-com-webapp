import { useContext } from 'react'

import { I18nContext } from './I18nContext'
import { LanguageCode } from 'data/languages'

export const useLanguageCode = (): LanguageCode => {
  const { languageCode } = useContext(I18nContext)

  return languageCode
}
