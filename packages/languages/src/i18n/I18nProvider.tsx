import React from 'react'
import { Catalog } from '@lingui/core'

import {
  I18n as LinguiI18nConsumer,
  I18nProvider as LinguiI18nProvider,
} from '@lingui/react'

import { I18nContext } from './I18nContext'

import {
  LANGUAGES,
  LanguageCode,
} from '../data/languages'

export interface I18nProviderProps {
  languageCode: LanguageCode;
  catalog: Catalog;
  children: React.ReactNode;
}

export const I18nProvider: React.FunctionComponent<I18nProviderProps> = ({
  languageCode,
  catalog,
  children,
}) => {
  if (!languageCode || !catalog) {
    return null
  }

  return (
    <LinguiI18nProvider
      language={languageCode}
      catalogs={{
        [languageCode]: catalog,
      }}
      missing='⚠️'
    >
      <LinguiI18nConsumer>
        {({ i18n }): React.ReactNode => (
          <I18nContext.Provider
            value={{
              languageCode,
              language: LANGUAGES[languageCode],
              i18n,
            }}
          >
            {children}
          </I18nContext.Provider>
        )}
      </LinguiI18nConsumer>
    </LinguiI18nProvider>
  )
}
