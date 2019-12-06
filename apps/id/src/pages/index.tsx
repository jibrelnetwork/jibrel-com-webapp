import React from 'react'
import { useI18n, useLanguage } from '../app/i18n'
import { useRouteNode } from 'react-router5'
import { Helmet } from 'react-helmet'

import * as pagesAvailable from './available'

const Pages: React.FunctionComponent = () => {
  const i18n = useI18n()
  const language = useLanguage()
  const { route } = useRouteNode('')

  if (!route) {
    console.error(new Error('NO_PAGE_SPECIFIED_FOR_PATH'))
    return null
  }

  const Page: React.ComponentClass | void = pagesAvailable[route.name]

  if (!Page) {
    const error = new Error('NO_PAGE_SPECIFIED_FOR_NAME')
    error.props = {
      name: route.name,
    }
    console.error(error)

    // FIXME: should return 404
    return null
  }

  window.scrollTo(0, 0)

  return (
    <>
      <Helmet>
        <html lang={language.tag} dir={language.dir} />
        <title>{i18n._('meta.website.title.empty')}</title>
      </Helmet>
      <Page />
    </>
  )
}

export default Pages
