import React from 'react'
import cc from 'classcat'

import inputStyle from '../Input/style.scss'
import style from './style.scss'

import {
  withField,
  withFieldUX,
  withMessage,
} from '../FieldWrapper'

export interface CodeInputProps extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  name: string;
  id?: string;
  label: string;
  className?: string;
  hasError?: boolean;
}

const getMaskLength = (value: string | number | string[] | undefined): number => {
  if (!value) {
    return 6
  }

  return Math.max(6 - value.toString().length, 0)
}

const CodeInput: React.FunctionComponent<CodeInputProps> = ({
  name,
  id,
  label,
  className,
  hasError = false,
  ...props
}) => {
  const mask = '_'.repeat(
    getMaskLength(props.value)
  )

  return (
    <label
      className={cc([
        inputStyle.wrapper,
        hasError && inputStyle.error,
        className,
      ])}
    >
      <input
        {...props}
        name={name}
        id={`t_${name}`}
        className={cc([
          inputStyle.input,
          style.code,
        ])}
      />
      <div className={cc([
        inputStyle.input,
        style.code,
        style.mask,
      ])}>
        <span className={style.invisible}>{props.value}</span><span>{mask}</span>
      </div>
      <div className={inputStyle.border} />
      <p className={inputStyle.label}>{label}</p>
    </label>
  )
}

export default withField(withFieldUX(React.memo(withMessage(CodeInput))))
