import Cookies from 'js-cookie'
import get from 'lodash-es/get'
import includes from 'lodash-es/includes'
import { MiddlewareFactory } from 'router5/types/types/router'

import { LANGUAGE_CODE_LIST } from '../../../data/languages'

export const setLangCookie: MiddlewareFactory = () => (toState, fromState, done): void => {
  const lang = get(toState, 'params.lang')

  if (
    lang
    && includes(LANGUAGE_CODE_LIST, lang)
  ) {
    Cookies.set('lang', lang, { expires: 365 })
  }

  return done()
}
