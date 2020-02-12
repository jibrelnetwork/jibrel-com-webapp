import React from 'react'
import { Catalog } from '@lingui/core'

import {
  I18n as LinguiI18nConsumer,
  I18nProvider as LinguiI18nProvider,
} from '@lingui/react'

import { I18nContext } from './I18nContext'
import { i18n as i18nInstance } from './i18n'

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

  i18nInstance.load({
    [languageCode]: catalog,
  })

  i18nInstance.activate(languageCode)

  return (
    <LinguiI18nProvider
      i18n={i18nInstance}
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
              i18n,
              languageCode,
              language: LANGUAGES[languageCode],
            }}
          >
            {children}
          </I18nContext.Provider>
        )}
      </LinguiI18nConsumer>
    </LinguiI18nProvider>
  )
}
