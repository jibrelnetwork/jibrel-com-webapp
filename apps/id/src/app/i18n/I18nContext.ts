import React from 'react'
import { I18n } from '@lingui/core'
import { LanguageMeta } from '../../data/languages'

export interface I18nContextProps {
  languageCode: string;
  language: LanguageMeta;
  i18n: I18n;
}

export const I18nContext = React.createContext<Partial<I18nContextProps>>({})
