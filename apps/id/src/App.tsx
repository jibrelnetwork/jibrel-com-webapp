import React, { useState } from 'react'
import { RouterProvider } from 'react-router5'
import { Provider as ReduxProvider } from 'react-redux'

import {
  I18nProvider,
  LanguageCode,
} from '@jibrelcom/i18n'

import { router } from './app/router'
import locales from './locales'
import store from './store'
import Pages from './pages'

router.setDependency('store', store)
router.start()

const LoadI18n: React.FunctionComponent = ({
  children,
}) => {
  // FIXME: replace with real logic
  // After we parse the route and redirect user to the destination
  // and request all their profile information
  // we should know, which language to load
  const [catalog, setCatalog] = useState()

  if (!catalog) {
    locales[LanguageCode.en]()
      .then((c) => setCatalog(c))

    return null
  }

  return (
    <I18nProvider
      languageCode={LanguageCode.en}
      catalog={catalog}
    >
      {children}
    </I18nProvider>
  )
}

const App: React.FunctionComponent = () => {
  return (
    <RouterProvider router={router}>
      <ReduxProvider store={store}>
        <LoadI18n>
          <Pages />
        </LoadI18n>
      </ReduxProvider>
    </RouterProvider>
  )
}

export default App
