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
  value?: boolean,
  hasError?: boolean,
  isDisabled?: boolean,
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  children,
  className,
  value = false,
  hasError = false,
  isDisabled = false,
  ...props
}) => {
  return (
    <label
      className={cc([
        style.checkbox,
        hasError && style.error,
        className,
      ])}
    >
      <input
        {...props}
        name={name}
        className={style.field}
        type='checkbox'
        disabled={isDisabled}
      />
      <Icon
        name={`checkbox_${value ? 'on' : 'off'}`}
        className={cc([
          style.tick,
          !value && style.off,
          isDisabled && style.disabled,
        ])}
      />
      <p className={style.label}>{children}</p>
    </label> 
  )
}

export default withField(withFieldUX(React.memo(Checkbox)))
