import {
  ActivationFnFactory,
  Router,
} from 'router5'

import { UserStatus } from 'store/types'

import { RouterDependencies } from '../types'

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
            lang: user.languageCode,
          },
        }
      }
    }

    return true
  }

export default isLoggedIn
