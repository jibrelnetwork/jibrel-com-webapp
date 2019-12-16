import {
  ActivationFnFactory,
  Router,
  State,
} from 'router5'

import { RouterDependencies } from '../types'

import { UserStatus } from 'store/types'

const NEXT_ROUTE = {
  [UserStatus.EMAIL_UNVERIFIED]: 'EmailVerification',
  [UserStatus.PHONE_UNVERIFIED]: 'VerifyPhone',
}

const isValidVerificationStep: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) =>
  (toState: State): boolean => {
    const { store } = dependencies
    const { user } = store.getState()

    if (
      user.status === UserStatus.EMAIL_UNVERIFIED
      && toState.name !== NEXT_ROUTE[UserStatus.EMAIL_UNVERIFIED]
    ) {
      throw {
        redirect: {
          name: NEXT_ROUTE[UserStatus.EMAIL_UNVERIFIED],
          params: {
            lang: user.languageCode,
          },
        }
      }
    }

    if (
      user.status === UserStatus.PHONE_UNVERIFIED
      && toState.name !== NEXT_ROUTE[UserStatus.PHONE_UNVERIFIED]
    ) {
      throw {
        redirect: {
          name: NEXT_ROUTE[UserStatus.PHONE_UNVERIFIED],
          params: {
            lang: user.languageCode,
          },
        }
      }
    }

    return true
  }

export default isValidVerificationStep
