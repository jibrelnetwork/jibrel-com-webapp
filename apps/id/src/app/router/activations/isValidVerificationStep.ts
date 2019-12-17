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
  (toState: State): Promise<boolean> => {
    const { store } = dependencies
    const { user } = store.getState()

    const nextRoute = NEXT_ROUTE[user.status]
    const toRoute = toState.name.split('.')[0]

    if (nextRoute !== toRoute) {
      return Promise.reject({
        redirect: {
          name: nextRoute,
          params: {
            lang: user.languageCode,
          },
        }
      })
    }

    return Promise.resolve(true)
  }

export default isValidVerificationStep
