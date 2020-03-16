import {
  State,
  Router,
  ActivationFnFactory,
} from 'router5'

import settings from 'app/settings'
import { UserStatus } from 'store/types'

import { RouterDependencies } from '../types'

import {
  changeLocation,
  checkRedirectState,
} from '../utils'

const KYC_SUBMITTED_STATUS = [
  UserStatus.KYC_PENDING,
  UserStatus.VERIFIED,
]

const checkKYCSubmitted: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) => async (toState: State): Promise<boolean> => {
  const { user } = dependencies.store.getState()

  if (user.status && KYC_SUBMITTED_STATUS.includes(user.status)) {
    checkRedirectState(toState, user.languageCode)

    if (!changeLocation(toState.params)) {
      window.location.href = settings.CMS_ORIGIN
    }

    throw {}
  }

  return Promise.resolve(true)
}

export default checkKYCSubmitted
