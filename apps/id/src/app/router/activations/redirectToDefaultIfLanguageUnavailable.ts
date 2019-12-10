import includes from 'lodash-es/includes'
import get from 'lodash-es/get'
import { ActivationFnFactory } from 'router5'

import { RouterDependencies } from '../types'

import { DEFAULT_LANGUAGE_CODE, LANGUAGE_CODE_LIST } from '../../../data/languages'

export const redirectToDefaultIfLanguageUnavailable: ActivationFnFactory = (router, dependencies: RouterDependencies) =>
  async (toState) => {
    const { store } = dependencies
    let { user } = store.getState()

    if (!user.status) {
      await store.dispatch.user.profile()
      user = store.getState().user
    }

    const lang = get(toState, 'params.lang')
    const name = toState.name.startsWith('redirect!')
      ? toState.name.slice(9)
      : toState.name

    if (!includes(LANGUAGE_CODE_LIST, lang)) {
      throw {
        redirect: {
          name,
          params: {
            ...toState.params,
            lang: user.languageCode || DEFAULT_LANGUAGE_CODE,
          }
        }
      }
    }

    return true
  }

