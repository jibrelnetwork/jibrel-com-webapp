import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

import { router } from 'app/router'

import { PhoneDomain } from './domain'
import { Phone, APIRqRetrivePhone, SuccessWrapper, FailWrapper } from './types'

import axios from '../../store/axios'

function createPhoneHandler(method: 'PUT' | 'POST') {
  return (payload: APIRqRetrivePhone): Promise<AxiosResponse<SuccessWrapper<Phone>>> | AxiosResponse<SuccessWrapper<Phone>> => {
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
  .effect<void, AxiosResponse<SuccessWrapper<Phone>>, AxiosError<FailWrapper<Phone>>>('retrieve phone')
  .use(() => axios.get('/v1/kyc/phone'))

export const setPhoneFx = PhoneDomain
  .effect<APIRqRetrivePhone, AxiosResponse<SuccessWrapper<Phone>>, AxiosError<FailWrapper<Phone>>>('submit phone')
  .use(createPhoneHandler('POST'))

export const updatePhoneFx = PhoneDomain
  .effect<APIRqRetrivePhone, AxiosResponse<SuccessWrapper<Phone>>, AxiosError<FailWrapper<Phone>>>('change phone')
  .use(createPhoneHandler('PUT'))

fetchPhoneFx.doneData.watch((result) => {
  console.log('Phone fetched', result.data.data)
})

fetchPhoneFx.fail.watch(({ error }) => {
  console.log('Phone fetching canceled', error.response?.data)

  setTimeout(() => {
    fetchPhoneFx()
  }, 2000)
})


function handleErrorSubmitPhoneFx(error: AxiosError<FailWrapper<Phone>>): void {
  if (error.response?.status === 400) {
    if (error.response.data.errors.number?.find((e) => e.code === 'same')) {
      router.navigate('VerifyPhoneCode')
    }
  }
}

function handleSuccessSubmitPhoneFx(): void {
  // TODO: Request SMS

  router.navigate('VerifyPhoneCode')
}

setPhoneFx.done.watch(handleSuccessSubmitPhoneFx)

updatePhoneFx.done.watch(handleSuccessSubmitPhoneFx)

setPhoneFx.failData.watch(handleErrorSubmitPhoneFx)

updatePhoneFx.failData.watch(handleErrorSubmitPhoneFx)
