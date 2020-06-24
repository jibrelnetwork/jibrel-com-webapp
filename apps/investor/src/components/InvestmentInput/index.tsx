import React from 'react'
import cc from 'classcat'
import BigNumber from 'bignumber.js'

import {
  Icon,
  withField,
  withFieldUX,
  withMessage,
} from '@jibrelcom/ui/src'

import style from './style.scss'

type OnChangeHandler = ((event?: React.ChangeEvent<HTMLInputElement>) => void) | undefined

interface InputProps {
  onChange?: OnChangeHandler;
  id?: string;
  name: string;
  value?: string;
  className?: string;
  isDisabled?: boolean;
}

const NumberInputMask = new RegExp(/[^0-9].{0}/g)

const parse = () => (value: string | void): string | void => {
  if (!value) {
    return value
  }

  return value.replace(NumberInputMask, '')
}

const format = () => (value: string | void): string | void => {
  if (!value) {
    return value
  }

  const extendedValue = new BigNumber(value)

  return extendedValue.toFormat(0)
}

const handleOnChange = (onChange: OnChangeHandler) => (event: React.ChangeEvent<HTMLInputElement>): void => {
  if (onChange === undefined) {
    event.preventDefault()

    return
  }

  const { value } = event.target

  onChange({
    ...event,
    target: {
      ...event.target,
      value: value.replace(NumberInputMask, '')
    }
  })

  return
}

const InvestmentInput: React.FunctionComponent<InputProps> = ({
  value = '',
  name,
  id,
  className,
  onChange,
  isDisabled,
  ...props
}) => (
  <div className={cc([style.wrapper, className])}>
    <input
      {...props}
      onChange={handleOnChange(onChange)}
      id={`t_${name}`}
      name={name}
      value={value}
      className={style.input}
      disabled={isDisabled}
      placeholder='0'
      inputMode='numeric'
      type='text'
    />
    <div className={style.symbol}>$</div>
    <div className={style.border} />
    <button
      className={style.cross}
      onClick={(): void => { return onChange ? onChange(undefined) : undefined }}
      type='button'
    >
      <Icon name='ic_close_24' />
    </button>
  </div>
)

export default withField(withFieldUX(React.memo(withMessage(InvestmentInput))), {
  format,
  parse,
  hint: ''
})

