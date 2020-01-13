import get from 'lodash-es/get'
import isString from 'lodash-es/isString'
import mapValues from 'lodash-es/mapValues'
import { FORM_ERROR } from 'final-form'

import { API_FORM_ERROR } from './types'

export default function getErrorFieldsFromResponse (error: any) {
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
}