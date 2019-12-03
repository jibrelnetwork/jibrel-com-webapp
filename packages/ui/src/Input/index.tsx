import React from 'react'
import cc from 'classcat'
import { FieldRenderProps } from 'react-final-form'

import style from './style.scss'

import { 
  withField,
  withFieldUX,
  withMessage,
} from '../FieldWrapper'

export interface InputProps extends FieldRenderProps<string | number> {
  type: string,
  label: string,
  className: string,
  hasError: boolean,
  isDisabled: boolean,
  isRequired: boolean,
}

const Input: React.FunctionComponent<InputProps> = ({
  meta,
  input,
  type,
  label,
  className,
  hasError,
  isDisabled,
  isRequired,
  ...props
}) => {
  return (
    <label className={cc([style.input, hasError && style.error, className])}>
      <input
        {...props}
        {...input}
        name={name}
        type={type}
        className={style.field}
        required={isRequired}
        disabled={isDisabled}
      />
      <div className={style.frame} />
      <p className={style.label}>{label}</p>
    </label> 
  )
}

Input.defaultProps = {
  type: 'text',
  hasError: false,
  isDisabled: false,
  isRequired: false,
}

export default React.memo(withMessage(Input))

export const SelectField = withField(withFieldUX(React.memo(withMessage(Input))))
