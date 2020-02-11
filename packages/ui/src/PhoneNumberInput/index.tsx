import React from 'react'
import { useI18n } from '@jibrelcom/i18n'

import { InputBase } from '../Input'
import { GenericFieldProps } from '../FieldWrapper/types'

import {
  withField,
  withFieldUX,
  withMessage,
} from '../FieldWrapper'

export interface PhoneNumberInputProps {
  label?: string;
  className?: string;
}

const parse = () => (value: string | void): string | void => value
  ? `+${value.replace(/[^\d]/g, '')}`
  : undefined

const PhoneNumberInput: React.FunctionComponent<GenericFieldProps & PhoneNumberInputProps> = ({
  label,
  className,
  ...props
}) => {
  const i18n = useI18n()

  return (
    <InputBase
      className={className}
      label={label || i18n._('form.phoneNumber.label')}
      {...props}
    />
  )
}

export default withField(withFieldUX(React.memo(withMessage(PhoneNumberInput))), {
  parse,
  format: parse,
})
