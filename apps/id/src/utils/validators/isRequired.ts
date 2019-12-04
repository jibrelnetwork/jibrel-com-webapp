import { FieldValidatorWithConfiguration } from '@jibrelcom/ui'

const isRequired: FieldValidatorWithConfiguration = ({ i18n }) => (value): string | void => {
  return value
    ? undefined
    // FIXME: should be proper string
    : i18n._('required')
}

export default isRequired
