import { useContext } from 'react'
import { I18n } from '@lingui/core'

import { I18nContext } from './I18nContext'

export const useI18n = (): I18n => {
  const { i18n } = useContext(I18nContext)

  return i18n
}
