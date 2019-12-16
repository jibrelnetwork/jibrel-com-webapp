import axios from 'axios'
import mapValues from 'lodash-es/mapValues'
import { FORM_ERROR } from 'final-form'

import settings from 'app/settings'
import { API_FORM_ERROR } from './types/api'

const instance = axios.create({
  baseURL: settings.API_BASE_URL,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response && error.response.status === 400) {
    error.formValidation = mapValues(
      error.response.data.errors,
      (e) => e[0].message,
    )

    if (error.formValidation[API_FORM_ERROR]) {
      error.formValidation[FORM_ERROR] = error.formValidation[API_FORM_ERROR]
    }
  }
  return Promise.reject(error)
})

export default instance
