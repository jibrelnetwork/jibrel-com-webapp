import { ActivationFnFactory, State } from 'router5'

import { PhoneVerificationStatus } from '../../../effector/phone/types'
import { fetchPhoneFx } from '../../../effector/phone/events'
import { $PhoneStore } from '../../../effector/phone/store'

const verifyPhone: ActivationFnFactory = () =>
  async (toState: State, fromState: State): Promise<boolean> => {
    await fetchPhoneFx()

    const phone = $PhoneStore.getState()

    if (phone.status === PhoneVerificationStatus.verified) {
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
