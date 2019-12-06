import includes from 'lodash-es/includes'
import get from 'lodash-es/get'
import { ActivationFnFactory } from 'router5'

import { DEFAULT_LANGUAGE_CODE, LANGUAGE_CODE_LIST } from '../../../data/languages'

export const redirectToDefaultIfLanguageUnavailable: ActivationFnFactory = () => (toState, fromState, done) => {
  const lang = get(toState, 'params.lang')
  const name = toState.name.startsWith('redirect!')
    ? toState.name.slice(9)
    : toState.name

  if (!includes(LANGUAGE_CODE_LIST, lang)) {
    return done({
      redirect: {
        name,
        params: {
          ...toState.params,
          lang: DEFAULT_LANGUAGE_CODE,
        }
      }
    })
  }

  return done()
}

