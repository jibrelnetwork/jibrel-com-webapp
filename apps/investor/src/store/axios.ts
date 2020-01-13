import axios from 'axios'
import { getErrorFieldsFromResponse } from '@jibrelcom/forms'

import settings from 'app/settings'

const instance = axios.create({
  baseURL: settings.API_BASE_URL,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
})

instance.interceptors.response.use(function (response) {
  return response
}, getErrorFieldsFromResponse)

export default instance
