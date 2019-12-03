import React from 'react'
import cc from 'classcat'
import { FieldRenderProps } from 'react-final-form'

import style from './style.scss'
import FieldMessage, { FieldMessageType } from '../FieldMessage'
import getErrorMessage, { FormValidateType } from '../utils/forms/getErrorMessage'

export interface InputProps extends FieldRenderProps<string | number | boolean> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type: string,
  label: string,
  message: string,
  className: string,
  messageType: FieldMessageType,
  validateType: FormValidateType,
  isDisabled: boolean,
  isRequired: boolean,
}

const Input: React.FunctionComponent<InputProps> = ({
  onChange,
  meta,
  type,
  label,
  message,
  className,
  messageType,
  validateType,
  isDisabled,
  isRequired,
  ...props
}) => {
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
        onChange={onChange}
        name={name}
        type={type}
        className={style.field}
        required={isRequired}
        disabled={isDisabled}
      />
      <div className={style.frame} />
      <p className={style.label}>{label}</p>
      <FieldMessage type={msgType}>{msg}</FieldMessage>
    </label> 
  )
}

Input.defaultProps = {
  message: '',
  type: 'text',
  messageType: FieldMessageType.info,
  validateType: FormValidateType.dirtySinceLastSubmit,
  isDisabled: false,
  isRequired: false,
}

export default React.memo(Input)
