import get from 'lodash-es/get'
import isObject from 'lodash-es/isObject'
import isString from 'lodash-es/isString'
import mapValues from 'lodash-es/mapValues'
import { FORM_ERROR } from 'final-form'

import { API_FORM_ERROR } from './types'

function mapErrorMessages(errors: Record<string, any>): Record<string, any> {
  return mapValues(
    errors,
    (e) => {
      if (isString(e[0])) {
        return e[0]
      } else if (e[0] && e[0].message) {
        return e[0].message
      } else if (isObject(e)) {
        return mapErrorMessages(e)
      }

      return null
    },
  )
}

export default function getErrorFieldsFromResponse (error: any): Promise<never> {
  if (error.response && error.response.status === 400) {
    const errors = get(error.response, 'data.errors') || get(error.response, 'data.data.errors') || {}
    error.formValidation = mapErrorMessages(errors)

    if (error.formValidation[API_FORM_ERROR]) {
      error.formValidation[FORM_ERROR] = error.formValidation[API_FORM_ERROR]
    }
  }

  return Promise.reject(error)
}