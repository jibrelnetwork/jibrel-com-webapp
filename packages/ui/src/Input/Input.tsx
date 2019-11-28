import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

import style from './input.scss'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type: string,
  name: string,
  label: string,
  className: string,
  isDisabled: boolean,
  isRequired: boolean,
}

const Input: FunctionComponent<Props> = ({
  onChange,
  type,
  name,
  label,
  className,
  isDisabled,
  isRequired,
}) => {
  return (
    <label className={classNames(style.input, className)}>
      <input
        onChange={onChange}
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
  isDisabled: false,
  isRequired: false,
}

export default Input
