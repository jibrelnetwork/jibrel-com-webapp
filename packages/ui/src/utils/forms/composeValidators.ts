import { I18n } from 'lingui__core'
import { FieldState, FieldValidator } from 'final-form'

import isPromise from '../isPromise'

type PossibleError = string | void
export interface FieldValidatorConfiguration {
  i18n: I18n;
}
export type FieldValidatorWithConfiguration = ({ i18n }: FieldValidatorConfiguration) => FieldValidator<any>

const composeValidators = (
  i18n: I18n,
  validators: FieldValidatorWithConfiguration[],
) => (
  value: any,
  allValues: object,
  meta?: FieldState<any>,
): string | void => {
  validators.reduce((errorOrPromise, validator) => {
    if (isPromise(errorOrPromise)) {
      return errorOrPromise
        .then((error: PossibleError): PossibleError | Promise<PossibleError> => {
          if (error) {
            return error
          }

          return validator({ i18n })(value, allValues, meta)
        })
    }

    return errorOrPromise
      || validator({ i18n })(value, allValues, meta)
  }, undefined)
}

export default composeValidators
