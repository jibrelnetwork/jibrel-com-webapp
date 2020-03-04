import axios from 'axios'
import axiosRetry, { AxiosExtendedInstance } from 'axios-retry'
import { getErrorFieldsFromResponse } from '@jibrelcom/forms'

import settings from 'app/settings'

const instance: AxiosExtendedInstance = axios.create({
  baseURL: settings.API_BASE_URL,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
})

instance.interceptors.response.use(function (response) {
  return response
}, getErrorFieldsFromResponse)

axiosRetry(instance)

export default instance
