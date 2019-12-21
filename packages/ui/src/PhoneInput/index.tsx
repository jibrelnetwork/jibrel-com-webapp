import React from 'react'
import cc from 'classcat'

import inputStyle from '../Input/style.scss'
import style from './style.scss'
import { GenericFieldProps } from '../FieldWrapper/types'
import {
  withField,
  withFieldUX,
  withMessage,
} from '../FieldWrapper'

export interface PhoneInputProps {
  ccc: string;
  label?: string;
  className?: string;
  hasError?: boolean;
  isDisabled?: boolean;
}

export const clearPhoneNumber = ({ ccc }: PhoneInputProps) => (phoneNumber: string): string => {
  if (!phoneNumber) {
    return phoneNumber
  }

  const unspacedPhoneNumber = phoneNumber.replace(/\s/g, '')

  if (unspacedPhoneNumber.startsWith(ccc)) {
    return unspacedPhoneNumber.replace(ccc, '').replace(/[^\d]/g, '')
  }

  return phoneNumber.replace(/[^\d]/g, '')
}

const PhoneInput: React.FunctionComponent<GenericFieldProps & PhoneInputProps> = ({
  ccc,
  className,
  label = 'Phone Number',
  name,
  hasError = false,
  isDisabled = false,
  ...props
}) => {
  return (
    <div
      className={cc([
        style.phone,
        className,
      ])}
    >
      <span className={style.ccc}>
        {ccc}
      </span>
      <label className={cc([inputStyle.input, hasError && inputStyle.error, className])}>
        <input
          {...props}
          name={name}
          type='text'
          className={cc([
            inputStyle.field,
            style.input,
          ])}
          disabled={isDisabled}
        />
        <div className={inputStyle.frame} />
        <p
          className={cc([
            inputStyle.label,
            style.label,
          ])}
        >
          {label}
        </p>
      </label>
    </div>
  )
}

export default withField(withFieldUX(React.memo(withMessage(PhoneInput))), {
  parse: clearPhoneNumber,
})
