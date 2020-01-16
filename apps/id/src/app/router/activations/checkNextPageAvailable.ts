import {
  State,
  Router,
  ActivationFnFactory,
} from 'router5'

import { UserStatus } from 'store/types'

import { RouterDependencies } from '../types'

const NEXT_ROUTES: { [key: string]: string[] } = {
  [UserStatus.EMAIL_UNVERIFIED]: ['EmailVerification', 'VerifyEmail'],
  [UserStatus.PHONE_UNVERIFIED]: ['VerifyPhone', 'VerifyPhoneCode'],
  [UserStatus.KYC_UNSET]: ['KYC', 'KYCIndividual', 'KYCCompany'],
  [UserStatus.KYC_PENDING]: ['KYCSuccess'],
  [UserStatus.VERIFIED]: ['Invest'],
}

const checkNextPageAvailable: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) =>
  (toState: State, fromState: State): Promise<boolean> => {
    const { store } = dependencies
    const { user } = store.getState()

    const nextRoutes: string[] | void = user.status ? NEXT_ROUTES[user.status] : undefined
    const toRoute = toState.name.split('.')[0]

    if (nextRoutes && !nextRoutes.includes(toRoute)) {
      return Promise.reject({
        redirect: {
          name: nextRoutes[0],
          params: {
            lang: user.languageCode,
            ...((fromState || toState).params),
          },
        }
      })
    }

    return Promise.resolve(true)
  }

export default checkNextPageAvailable
