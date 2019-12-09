import React from 'react'
import cc from 'classcat'

import Input from '../Input'
import style from './style.scss'
import { GenericFieldProps } from '../FieldWrapper/types'

export interface PhoneInputProps {
  ccc: string;
  label?: string;
  className?: string;
}

const PhoneInput: React.FunctionComponent<GenericFieldProps & PhoneInputProps> = ({
  ccc,
  className,
  label = 'Phone Number',
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
      <Input
        {...props}
        label={label}
        inputClassName={style.input}
        labelClassName={style.label}
      />
    </div>
  )
}

export default React.memo(PhoneInput)
