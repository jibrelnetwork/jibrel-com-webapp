import { PhoneDomain } from './domain'
import { PhoneVerificationState } from './types'
import {
  putPhone,
  putLimits,
  fetchPhoneFx,
  requestVerificationCode,
  submitCodeFx
} from './events'

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
  .on(submitCodeFx.doneData, (state, result) => ({
    ...state,
    ...result.data.data
  }))
  .on(putPhone, (state, data) => ({
    ...state,
    ...data,
  }))
  .on(putLimits, (state, data) => ({
    ...state,
    requestAvailableAt: data.resendVerificationSMS
      ? new Date(Date.now() + data.resendVerificationSMS.leftSeconds * 1000)
      : new Date()
  }))

$PhoneStore.updates.watch((state) => console.log('Current $PhoneState:', state))
