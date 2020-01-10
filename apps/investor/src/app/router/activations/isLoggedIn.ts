import { DEFAULT_LANGUAGE_CODE } from '@jibrelcom/languages'

import {
  Router,
  ActivationFnFactory,
} from 'router5'

import { UserStatus } from 'store/types'

import { RouterDependencies } from '../types'

const isLoggedIn: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) =>
  async (): Promise<boolean> => {
    const { store } = dependencies

    try {
      await store.dispatch.user.updateProfile()
    } catch (error) {
      // we will check result below
    }

    const { user } = store.getState()

    if (!user.status || user.status === UserStatus.ANONYMOUS) {
      // window.location.href = `https://id.jibrel.com/${user.languageCode || DEFAULT_LANGUAGE_CODE}/login`

      throw {}
    }

    return true
  }

export default isLoggedIn
