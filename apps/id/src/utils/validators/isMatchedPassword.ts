import { FieldValidatorConfiguration } from '@jibrelcom/ui'

const isMatchedPassword = (
  { i18n }: FieldValidatorConfiguration,
) => (
  value: string | void,
  allValues: { password?: string },
): string | void => {
  return (value === allValues.password)
    ? undefined
    : i18n._('form.error.isMatchedPassword')
}

export default isMatchedPassword
