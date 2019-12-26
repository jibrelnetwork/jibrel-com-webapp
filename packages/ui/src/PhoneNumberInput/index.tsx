import React from 'react'

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
  className,
  label = 'Primary Telephone (Optional)',
  ...props
}) => {
  return (
    <InputBase
      {...props}
      label={label}
      className={className}
    />
  )
}

export default withField(withFieldUX(React.memo(withMessage(PhoneNumberInput))), {
  parse,
  format: parse,
  hint: 'Please enter phone number in international format (only plus sign and numbers)',
})
