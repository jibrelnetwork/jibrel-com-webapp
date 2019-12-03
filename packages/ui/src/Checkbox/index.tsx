import React from 'react'
import cc from 'classcat'

import Icon from '../Icon'
import style from './style.scss'

import { 
  withField,
  withFieldUX,
} from '../FieldWrapper'

export interface CheckboxProps {
  children: React.ReactNode,
  className: string,
  value: boolean,
  hasError: boolean,
  isDisabled: boolean,
  isRequired: boolean,
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  children,
  value,
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
        name={name}
        className={style.field}
        type='checkbox'
        required={isRequired}
        disabled={isDisabled}
      />
      <Icon
        name={`checkbox_${value ? 'on' : 'off'}`}
        className={cc([style.checkbox, !value && style.off, isDisabled && style.disabled])}
      />
      <p className={style.label}>{children}</p>
    </label> 
  )
}

Checkbox.defaultProps = {
  hasError: false,
  isDisabled: false,
  isRequired: false,
}

export default withField(withFieldUX(React.memo(Checkbox)))
