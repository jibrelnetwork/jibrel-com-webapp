import { AxiosError, AxiosRequestConfig } from 'axios'

import { router } from 'app/router'
import axios from 'store/axios'

import { PhoneDomain } from './domain'
import {
  Phone,
  APIRqRetrivePhone,
  APIRqVerifyPhoneNumber,
  SuccessWrapper,
  FailWrapper,
  PhoneVerificationStatus,
  PhoneConfirmationVariant,
} from './types'
import { checkPhoneUntilResult } from './utils'

function createPhoneHandler(method: 'PUT' | 'POST') {
  return (payload: APIRqRetrivePhone): Promise<SuccessWrapper<Phone>> | SuccessWrapper<Phone> => {
    const data = {
      number: `${payload.countryCode}${payload.number}`
    }

    const config: AxiosRequestConfig = {
      url: '/v1/kyc/phone',
      data,
      method
    }

    return axios.request(config)
  }
}

export const fetchPhoneFx = PhoneDomain
  .effect<void, SuccessWrapper<Phone>, FailWrapper<Phone>>('retrieve phone')
  .use(() => axios.get('/v1/kyc/phone'))

export const setPhoneFx = PhoneDomain
  .effect<APIRqRetrivePhone, SuccessWrapper<Phone>, FailWrapper<Phone>>('submit phone')
  .use(createPhoneHandler('POST'))

export const updatePhoneFx = PhoneDomain
  .effect<APIRqRetrivePhone, SuccessWrapper<Phone>, FailWrapper<Phone>>('change phone')
  .use(createPhoneHandler('PUT'))

export const submitCodeFx = PhoneDomain
  .effect<APIRqVerifyPhoneNumber, SuccessWrapper<Phone>, AxiosError>('submit pin code')
  .use((payload) => {
    return axios.post(
      '/v1/kyc/phone/verify',
      payload,
    )
  })
  .use(() => checkPhoneUntilResult())

export const requestVerificationCode = PhoneDomain
  .effect<PhoneConfirmationVariant, SuccessWrapper<Phone>, FailWrapper<Phone>>('request phone verification code')
  .use((method) => axios.post(`/v1/kyc/phone/${method === PhoneConfirmationVariant.sms ? 'resend-sms' : 'call-me'}`))

// FIXME: Just retry example
fetchPhoneFx.fail.watch(({ error }) => {
  console.log('Phone fetching canceled: ', error.response?.data)

  setTimeout(() => {
    fetchPhoneFx()
  }, 2000)
})

function handleErrorSubmitPhoneFx(error: FailWrapper<Phone>): void {
  if (error.response?.status === 400) {
    if (error.response.data.errors.number?.find((e) => e.code === 'same')) {
      router.navigate('VerifyPhoneCode')
    }
  }
}

function handleSuccessSubmitPhoneFx(): void {
  requestVerificationCode(PhoneConfirmationVariant.sms)

  router.navigate('VerifyPhoneCode')
}

setPhoneFx.done.watch(handleSuccessSubmitPhoneFx)

updatePhoneFx.done.watch(handleSuccessSubmitPhoneFx)

setPhoneFx.failData.watch(handleErrorSubmitPhoneFx)

updatePhoneFx.failData.watch(handleErrorSubmitPhoneFx)

submitCodeFx.doneData.watch((response) => {
  const { data: { data: phone } } = response
  // if (data.status === PhoneVerificationStatus.codeIncorrect) {}

  if (phone.status === PhoneVerificationStatus.verified) {
    router.navigate('KYC')
  }
})
