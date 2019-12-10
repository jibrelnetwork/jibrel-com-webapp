import React from 'react'
import cc from 'classcat'

import style from './style.scss'

import { 
  withField,
  withFieldUX,
  withMessage,
} from '../FieldWrapper'

export interface InputProps {
  type?: string;
  label: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  hasError?: boolean;
  isDisabled?: boolean;
}

const Input: React.FunctionComponent<InputProps> = ({
  label,
  className,
  inputClassName,
  labelClassName,
  type = 'text',
  hasError = false,
  isDisabled = false,
  ...props
}) => {
  return (
    <label className={cc([style.input, hasError && style.error, className])}>
      <input
        {...props}
        name={name}
        type={type}
        className={cc([
          style.field,
          inputClassName,
        ])}
        disabled={isDisabled}
      />
      <div className={style.frame} />
      <p
        className={cc([
          style.label,
          labelClassName,
        ])}
      >
        {label}
      </p>
    </label>
  )
}

export default withField(withFieldUX(React.memo(withMessage(Input))))
