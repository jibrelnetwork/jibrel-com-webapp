import {
  ActivationFnFactory,
  Router,
} from 'router5'

import { RouterDependencies } from '../types'

import { DEFAULT_LANGUAGE_CODE } from 'data/languages'
import { UserStatus } from 'store/types'

const isLoggedIn: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) =>
  async () => {
    const { store } = dependencies
    try {
      await store.dispatch.user.updateProfile()
    } catch (error) {
      // we will check result below
    }
    const { user } = store.getState()

    if (!user.status || user.status === UserStatus.ANONYMOUS) {
      throw {
        redirect: {
          name: 'Login',
          params: {
            lang: user.languageCode || DEFAULT_LANGUAGE_CODE,
          },
        }
      }
    }

    return true
  }

export default isLoggedIn
