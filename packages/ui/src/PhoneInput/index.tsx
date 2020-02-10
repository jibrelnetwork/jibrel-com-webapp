import React from 'react'
import cc from 'classcat'
import { useI18n } from '@jibrelcom/i18n'

import { InputBase } from '../Input'
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
  label,
  className,
  ...props
}) => {
  const i18n = useI18n()

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
      <InputBase
        classNames={style}
        label={label || i18n._('form.phone.label')}
        {...props}
      />
    </div>
  )
}

export default withField(withFieldUX(React.memo(withMessage(PhoneInput))), {
  parse: clearPhoneNumber,
})
