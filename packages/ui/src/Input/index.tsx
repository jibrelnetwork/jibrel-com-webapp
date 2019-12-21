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
  classNames?: {
    wrapper?: string;
    input?: string;
    label?: string;
  };
  inputClassName?: string;
  labelClassName?: string;
  hasError?: boolean;
  isDisabled?: boolean;
}

export const InputBase: React.FunctionComponent<InputProps> = ({
  label,
  className,
  classNames = {},
  inputClassName,
  labelClassName,
  type = 'text',
  hasError = false,
  isDisabled = false,
  ...props
}) => {
  return (
    <label className={cc([
      style.wrapper,
      hasError && style.error,
      classNames.wrapper,
      className,
    ])}>
      <input
        {...props}
        name={name}
        type={type}
        className={cc([
          style.input,
          classNames.input,
          inputClassName,
        ])}
        disabled={isDisabled}
      />
      <div className={style.border} />
      <p
        className={cc([
          style.label,
          classNames.label,
          labelClassName,
        ])}
      >
        {label}
      </p>
    </label>
  )
}

export default withField(withFieldUX(React.memo(withMessage(InputBase))))
