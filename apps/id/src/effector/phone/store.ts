import { PhoneDomain } from './domain'
import { PhoneVerificationState } from './types'
import { fetchPhoneFx, setPhoneFx, updatePhoneFx, submitCodeFx, requestVerificationCode } from './events'

const initialState: PhoneVerificationState = {
  isLoading: false,
  maskedNumber: '',
  status: undefined,
  requestAvailableAt: undefined,
  confirmationVariant: undefined,
}

export const $PhoneStore = PhoneDomain.store<PhoneVerificationState>(initialState)
  .on(fetchPhoneFx.pending, (state, pending) => ({ ...state, isLoading: pending }))
  .on(fetchPhoneFx.done, (state, { result }) => ({
    ...state,
    isLoading: false,
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

    return {
      ...state,
      isLoading: false,
    }
  })
  // FIXME: Make new store for phone verification state
  .on(setPhoneFx.pending, (state, pending) => ({ ...state, isLoading: pending }))
  .on(setPhoneFx.done, (state) => ({ ...state, isLoading: false }))
  .on(setPhoneFx.fail, (state) => ({ ...state, isLoading: false }))
  .on(updatePhoneFx.pending, (state, pending) => ({ ...state, isLoading: pending }))
  .on(updatePhoneFx.done, (state) => ({ ...state, isLoading: false }))
  .on(updatePhoneFx.fail, (state) => ({ ...state, isLoading: false }))
  .on(submitCodeFx.pending, (state, pending) => ({ ...state, isLoading: pending }))
  .on(submitCodeFx.done, (state) => ({ ...state, isLoading: false }))
  .on(submitCodeFx.fail, (state) => ({ ...state, isLoading: false }))
  .on(requestVerificationCode.pending, (state, pending) => ({ ...state, isLoading: pending }))
  .on(requestVerificationCode.done, (state, { result }) => ({
    ...state,
    ...result.data,
    isLoading: false,
  }))
  .on(requestVerificationCode.fail, (state) => ({ ...state, isLoading: false }))

$PhoneStore.updates.watch((state) => console.log('Current $PhoneState:', state))
