import { PhoneDomain } from './domain'
import { PhoneVerificationState } from './types'
import { fetchPhoneFx } from './events'

const initialState: PhoneVerificationState = {
  status: undefined,
  isLoading: false,
  maskedNumber: '',
  requestAvailableAt: undefined,
  confirmationVariant: undefined,
}

export const $PhoneStore = PhoneDomain.store<PhoneVerificationState>(initialState)
  .on(fetchPhoneFx.done, (state, { result }) => ({
    ...state,
    status: result.data.data.status,
    maskedNumber: result.data.data.number
  }))
  .on(fetchPhoneFx.fail, (state, { error }) => {
    if (error.isAxiosError) {
      console.log('Axios Error', error.response?.data.errors)
    }
    else {
      console.log('Network error', error)
    }

    return state
  })

