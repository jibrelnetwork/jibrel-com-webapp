import React from 'react'
import cc from 'classcat'
import { FieldRenderProps } from 'react-final-form'

import Icon from '../Icon'
import style from './style.scss'
import FieldMessage, { FieldMessageType } from '../FieldMessage'
import getErrorMessage, { FormValidateType } from '../utils/forms/getErrorMessage'

export interface CheckboxProps extends FieldRenderProps<boolean> {
  children: React.ReactNode,
  message: string,
  className: string,
  messageType: FieldMessageType,
  validateType: FormValidateType,
  isDisabled: boolean,
  isRequired: boolean,
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  meta,
  input,
  children,
  message,
  className,
  messageType,
  validateType,
  isDisabled,
  isRequired,
  ...props
}) => {
  const {
    value,
    ...other
  } = input

  const errorMsg: string | null = getErrorMessage(
    meta,
    validateType,
  )

  const msg: string = errorMsg || message
  const msgType: FieldMessageType = !!errorMsg ? FieldMessageType.error : messageType

  return (
    <label className={cc([style.input, style[msgType], className])}>
      <input
        {...props}
        {...other}
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
      <FieldMessage type={msgType}>{msg}</FieldMessage>
    </label> 
  )
}

Checkbox.defaultProps = {
  message: '',
  messageType: FieldMessageType.info,
  validateType: FormValidateType.dirtySinceLastSubmit,
  isDisabled: false,
  isRequired: false,
}

export default Checkbox
