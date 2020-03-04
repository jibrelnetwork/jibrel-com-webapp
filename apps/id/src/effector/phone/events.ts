import { AxiosError, AxiosRequestConfig } from 'axios'

import { router } from 'app/router'
import axios from 'store/axios'

import { PhoneDomain } from './domain'
import {
  Phone,
  APIRqVerifyPhoneNumber,
  SuccessWrapper,
  FailWrapper,
  PhoneVerificationStatus,
  PhoneConfirmationVariant, ChangePhoneEffect
} from './types'
import { checkPhoneUntilResult } from './utils'

export const putPhone = PhoneDomain.createEvent<Phone>('put Phone data to store')

export const fetchPhoneFx = PhoneDomain
  .effect<void, SuccessWrapper<Phone>, FailWrapper<Phone>>('retrieve phone')
  .use(() => axios.get('/v1/kyc/phone'))

export const savePhoneFx = PhoneDomain
  .effect<ChangePhoneEffect, SuccessWrapper<Phone>, FailWrapper<Phone>>('submit phone')
  .use(({ method, payload}): Promise<SuccessWrapper<Phone>> => {
    const data = {
      number: `${payload.countryCode}${payload.number}`
    }

    const config: AxiosRequestConfig = {
      url: '/v1/kyc/phone',
      data,
      method
    }

    return axios.request(config)
  })

export const submitCodeFx = PhoneDomain
  .effect<APIRqVerifyPhoneNumber, SuccessWrapper<Phone>, AxiosError>('submit pin code')
  .use(async (payload) => {
    try {
      await axios.post(
        '/v1/kyc/phone/verify',
        payload,
      )
    } catch(error) {
      console.log('Request FAILED')
      const phone = error.response?.data.data
      putPhone(phone)
    }

    return await checkPhoneUntilResult()
  })

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

savePhoneFx.done.watch(() => {
  requestVerificationCode(PhoneConfirmationVariant.sms)

  router.navigate('VerifyPhoneCode')
})

savePhoneFx.failData.watch((error) => {
  if (error.response?.status === 400) {
    if (error.response.data.errors.number?.find((e) => e.code === 'same')) {
      router.navigate('VerifyPhoneCode')
    }
  }
})

submitCodeFx.doneData.watch((response) => {
  const { data: { data: phone } } = response

  if (phone.status === PhoneVerificationStatus.verified) {
    router.navigate('KYC')
  }
})
