import React from 'react'
import cc from 'classcat'
import omit from 'lodash-es/omit'

import Icon from '../Icon'
import style from './style.scss'

import {
  withField,
  withFieldUX,
} from '../FieldWrapper'

export interface CheckboxProps {
  id?:string;
  name:string;
  children: React.ReactNode;
  className?: string;
  checked?: boolean;
  hasError?: boolean;
  isDisabled?: boolean;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  id,
  name,
  children,
  className,
  checked = false,
  hasError = false,
  isDisabled = false,
  ...initialProps
}) => {
  const props = omit(initialProps, ['message', 'messageType'])
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
        checked={checked}
        name={name}
        id={id || `t_${name}`}
        className={style.field}
        type='checkbox'
        disabled={isDisabled}
      />
      <Icon
        name={`checkbox_${checked ? 'on' : 'off'}`}
        className={cc([
          style.tick,
          !checked && style.off,
          isDisabled && style.disabled,
        ])}
      />
      <p className={style.label}>{children}</p>
    </label>
  )
}

export default withField(
  withFieldUX(React.memo(Checkbox)),
  { type: 'checkbox' },
)
