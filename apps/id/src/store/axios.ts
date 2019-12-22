import axios from 'axios'
import mapValues from 'lodash-es/mapValues'
import isString from 'lodash-es/isString'
import get from 'lodash-es/get'
import { FORM_ERROR } from 'final-form'

import settings from 'app/settings'
import { API_FORM_ERROR } from './types/api'

const instance = axios.create({
  baseURL: settings.API_BASE_URL,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response && error.response.status === 400) {
    const errors = get(error.response, 'data.errors') || get(error.response, 'data.data.errors') || {}
    error.formValidation = mapValues(
      errors,
      (e) => isString(e[0])
        ? e[0]
        : e[0].message,
    )

    if (error.formValidation[API_FORM_ERROR]) {
      error.formValidation[FORM_ERROR] = error.formValidation[API_FORM_ERROR]
    }
  }
  return Promise.reject(error)
})

export default instance
