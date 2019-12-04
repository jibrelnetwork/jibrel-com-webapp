import { I18n } from 'lingui__core'
import { FieldState, FieldValidator } from 'final-form'

import isPromise from '../isPromise'

type PossibleError = string | void
export interface FieldValidatorConfiguration {
  i18n: I18n;
}
export type FieldValidatorWithConfiguration<FieldValue> = ({ i18n }: FieldValidatorConfiguration) => FieldValidator<FieldValue>

const composeValidators = <FieldValue>(
  i18n: I18n,
  validators: FieldValidatorWithConfiguration<FieldValue>[],
) => (
  value: FieldValue,
  allValues: object,
  meta?: FieldState<FieldValue>,
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
