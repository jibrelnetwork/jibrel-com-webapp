import {
  State,
  Router,
  ActivationFnFactory,
} from 'router5'

import { UserStatus } from 'store/types'

import { RouterDependencies } from '../types'

import {
  changeLocation,
  checkRedirectState,
} from '../utils'

const checkKYCPending: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) => async (toState: State): Promise<boolean> => {
  const { user } = dependencies.store.getState()

  if (user.status === UserStatus.KYC_PENDING) {
    checkRedirectState(toState, user.languageCode)
    const isLocationChanged = changeLocation(toState.params)

    if (isLocationChanged) {
      throw {}
    }
  }

  return Promise.resolve(true)
}

export default checkKYCPending
