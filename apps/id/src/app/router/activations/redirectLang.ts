import includes from 'lodash-es/includes'
import get from 'lodash-es/get'
import { LANGUAGE_CODE_LIST } from '@jibrelcom/i18n'

import {
  ActivationFnFactory,
  Router,
  State,
} from 'router5'

import { RouterDependencies } from '../types'

export const redirectLang: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) =>
  async (toState: State): Promise<boolean> => {
    const { store } = dependencies
    let { user } = store.getState()

    if (!user.status) {
      await store.dispatch.user.updateProfile()
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
            lang: user.languageCode,
          }
        }
      }
    }

    return true
  }

export default redirectLang
