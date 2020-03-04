import { PhoneDomain } from './domain'
import { PhoneVerificationState } from './types'
import { fetchPhoneFx, putPhone, requestVerificationCode, submitCodeFx } from './events'

const initialState: PhoneVerificationState = {
  maskedNumber: '',
  status: undefined,
  requestAvailableAt: undefined,
  confirmationVariant: undefined,
}

export const $PhoneStore = PhoneDomain.store<PhoneVerificationState>(initialState)
  .on(fetchPhoneFx.doneData, (state, result) => ({
    ...state,
    status: result.data.data.status,
    maskedNumber: result.data.data.number
  }))
  .on(fetchPhoneFx.failData, (state, error) => {
    if (error.isAxiosError) {
      console.log('Axios Error', error.response?.data.errors)
    }
    else {
      console.log('Network error', error)
    }

    return {
      ...state,
    }
  })
  .on(requestVerificationCode.doneData, (state, result) => ({
    ...state,
    ...result.data,
  }))
  .on(submitCodeFx.failData, (state, error) => ({
    ...state,
    ...error.response?.data.data
  }))
  .on(putPhone, (state, data) => ({
    ...state,
    ...data,
  }))

$PhoneStore.updates.watch((state) => console.log('Current $PhoneState:', state))
