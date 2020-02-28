import { AxiosResponse, AxiosError } from 'axios'

import { PhoneDomain } from './domain'
import { Phone } from './types'

import axios from '../../store/axios'

type BackendErrorMessage = {
  message: string;
  code: string;
}

interface SuccessWrapper<T = any> {
  data: T;
}

interface FailWrapper {
  errors: {
    field: BackendErrorMessage[];
  };
}

declare type BackendWrapper<T = null> = T extends null ?  FailWrapper : SuccessWrapper<T>

export const fetchPhoneFx = PhoneDomain
  .effect<void, AxiosResponse<BackendWrapper<Phone>>, AxiosError<BackendWrapper>>('fetch phone')
  .use(() => axios.get<BackendWrapper<Phone>>('/v1/kyc/phone'))

fetchPhoneFx.done.watch(({ result }) => {
  console.log('Phone fetched', result.data.data)
})

fetchPhoneFx.fail.watch(({ error }) => {
  console.log('Phone fetching canceled', error.response?.data)

  setTimeout(() => {
    fetchPhoneFx()
  }, 2000)
})
