import { FieldValidatorConfiguration } from '@jibrelcom/ui'

const MIN_PASSWORD_SCORE = 3

const isStrongPassword = (
  { i18n }: FieldValidatorConfiguration,
) => (
  value: string | void,
  allValues: { score?: number },
): string | void => {
  return ((allValues.score || 0) >= MIN_PASSWORD_SCORE)
    ? undefined
    : i18n._('form.error.isNotStrongPassword')
}

export default isStrongPassword
