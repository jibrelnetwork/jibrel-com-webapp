import { ActivationFnFactory, Router, State } from 'router5'

import { RouterDependencies } from '../types'

import { PhoneVerificationStatus } from 'store/types'

const verifyPhone: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) =>
  async (toState: State, fromState: State): Promise<boolean> => {
    const { store } = dependencies
    try {
      await store.dispatch.phone.init()
    } catch (e) {
      // handle exception below
    }
    const { phone } = store.getState()

    if (phone.backendStatus === PhoneVerificationStatus.verified) {
      throw {
        redirect: {
          name: 'KYC',
        },
      }
    }

    // if user comes with full page reload, we should check which state to show
    if (!fromState) {
      if (!phone.status) {
        if (toState.name === 'VerifyPhone') {
          return true
        }
        throw {
          redirect: {
            name: 'VerifyPhone',
          }
        }
      } else {
        if (toState.name === 'VerifyPhoneCode') {
          return true
        }
        throw {
          redirect: {
            name: 'VerifyPhoneCode',
          }
        }
      }
    }

    return true
  }

export default verifyPhone
