import { ActivationFnFactory, Router, State } from 'router5'

import { RouterDependencies } from '../types'

import { UserStatus } from 'store/types'
import settings from 'app/settings'

const NEXT_ROUTES = {
  [UserStatus.EMAIL_UNVERIFIED]: ['EmailVerification'],
  [UserStatus.PHONE_UNVERIFIED]: ['VerifyPhone', 'VerifyPhoneCode'],
  [UserStatus.KYC_UNSET]: ['KYC'],
  [UserStatus.KYC_PENDING]: ['KYCSuccess'],
}

const isValidVerificationStep: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) =>
  (toState: State): Promise<boolean> => {
    const { store } = dependencies
    const { user } = store.getState()

    const nextRoutes = NEXT_ROUTES[user.status]
    const toRoute = toState.name.split('.')[0]

    if (user.status === UserStatus.VERIFIED) {
      window.location.href = `${settings.HOST_CMS}/${user.languageCode}`
      return Promise.resolve(true)
    }

    if (nextRoutes && !nextRoutes.includes(toRoute)) {
      return Promise.reject({
        redirect: {
          name: nextRoutes[0],
          params: {
            lang: user.languageCode,
          },
        }
      })
    }

    return Promise.resolve(true)
  }

export default isValidVerificationStep
