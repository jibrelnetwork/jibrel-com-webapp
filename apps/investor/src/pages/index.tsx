import React from 'react'
import get from 'lodash-es/get'
import { constants } from 'router5'
import { Helmet } from 'react-helmet'
import { useRouteNode } from 'react-router5'

import {
  useI18n,
  useLanguage,
} from '@jibrelcom/i18n'

import CoreLayout from 'layouts/CoreLayout'

import * as pagesAvailable from './available'

const NotFound: React.FunctionComponent = ({ ...props }) => (
  <CoreLayout>
    <pagesAvailable.NotFound {...props} />
  </CoreLayout>
)

const Pages: React.FunctionComponent = () => {
  const i18n = useI18n()
  const language = useLanguage()
  const { route } = useRouteNode('')

  if (!route) {
    console.error(new Error('NO_ROUTE'))

    // FIXME: should show loader
    return null
  }

  const Page: React.ComponentClass | void = route.name === constants.UNKNOWN_ROUTE
    ? NotFound
    : get(pagesAvailable, route.name)

  if (!Page) {
    const error = new Error('NO_PAGE_SPECIFIED_FOR_NAME')
    console.error(error)
    console.error(route.name)

    // FIXME: should return 404
    return null
  }

  console.log(route.name)

  window.scrollTo(0, 0)

  return (
    <>
      <Helmet>
        <html lang={language.tag} dir={language.dir} />
        <title>{i18n._('meta.website.title.empty')}</title>
      </Helmet>
      <Page {...route.params} />
    </>
  )
}

export default Pages
