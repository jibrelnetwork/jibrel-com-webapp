import React from 'react'
import cc from 'classcat'
import { FieldRenderProps } from 'react-final-form'

import getErrorMessage, { FormValidateType } from '../utils/forms/getErrorMessage'

import style from './style.scss'

import { InputMessageType } from './types'

export interface InputProps extends FieldRenderProps<string | number | boolean> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type: string,
  label: string,
  message: string,
  className: string,
  messageType: InputMessageType,
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
  const msgType: InputMessageType = !!errorMsg ? InputMessageType.error : messageType

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
      <p className={style.message}>{msg}</p>
    </label> 
  )
}

Input.defaultProps = {
  message: '',
  type: 'text',
  messageType: InputMessageType.info,
  validateType: FormValidateType.dirtySinceLastSubmit,
  isDisabled: false,
  isRequired: false,
}

export default React.memo(Input)
