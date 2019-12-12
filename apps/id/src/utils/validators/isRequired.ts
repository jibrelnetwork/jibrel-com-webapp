import { FieldValidatorConfiguration } from '@jibrelcom/ui'

const isRequired = (
  { i18n }: FieldValidatorConfiguration,
) => (
  value: string | void,
): string | void => {
  return value
    ? undefined
    : i18n._('form.error.isRequired')
}

export default isRequired
