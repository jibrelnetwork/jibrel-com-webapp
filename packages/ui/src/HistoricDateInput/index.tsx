import React from 'react'
import cc from 'classcat'
import MaskedInput from 'react-text-mask'

import style from '../Input/style.scss'
import { GenericFieldProps } from '../FieldWrapper/types'
import {
  withField,
  withFieldUX,
  withMessage,
} from '../FieldWrapper'

export interface HistoricDateInputProps {
  label?: string;
  className?: string;
  hasError?: boolean;
  isDisabled?: boolean;
}

const parse = () => (value: string | void): string | void => {
  if (!value) {
    return value
  }

  const [dd, mm, yyyy] = value.split('-')
  return [yyyy, mm, dd].join('-')
}

const format = () => (value: string | void): string | void => {
  if (!value) {
    return value
  }

  const [yyyy, mm, dd] = value.split('-')
  return [dd, mm, yyyy].join('-')
}

const HistoricDateInput: React.FunctionComponent<GenericFieldProps & HistoricDateInputProps> = ({
  className,
  label = 'Date',
  hasError = false,
  isDisabled = false,
  ...props
}) => {
  return (
    <label className={cc([
      style.wrapper,
      hasError && style.error,
      className,
    ])}>
      <MaskedInput
        mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholder='DD-MM-YYYY'
        className={style.input}
        disabled={isDisabled}
        {...props}
      />
      <div className={style.border} />
      <p
        className={style.label}
      >
        {label}
      </p>
    </label>
  )
}

export default withField(withFieldUX(React.memo(withMessage(HistoricDateInput))), {
  parse,
  format,
  hint: 'Please enter the date as DD-MM-YYYY',
})
