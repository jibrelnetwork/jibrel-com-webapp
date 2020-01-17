import React from 'react'
import cc from 'classcat'
import BigNumber from 'bignumber.js'

import { withField, withFieldUX } from '@jibrelcom/ui/src'
import { Icon } from '@jibrelcom/ui'

import { OnChangeHandler } from './types'

import style from './style.scss'

interface InputProps {
  onChange?: OnChangeHandler;
  className?: string;
  isDisabled?: boolean;
  value?: string;
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

const handleOnChange = (onChange: OnChangeHandler) => (event: React.ChangeEvent<HTMLInputElement>): OnChangeHandler => {
  if (onChange === undefined) {
    event.preventDefault()
    return
  }

  const { value } = event.target

  return onChange({
    ...event,
    target: {
      ...event.target,
      value: value.replace(NumberInputMask, '')
    }
  })
}

const InvestmentInput: React.FunctionComponent<InputProps> = ({
  value = '',
  className,
  onChange,
  isDisabled,
  messageType,
  hasError,
  ...props
}) => (
  <div className={cc([style.wrapper, className])}>
    <input
      {...props}
      onChange={handleOnChange(onChange)}
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
      onClick={(): void => { onChange(undefined) }}
      type='button'
    >
      <Icon name='ic_close_24' />
    </button>
  </div>
)

export default withField(withFieldUX(React.memo(InvestmentInput)), {
  format,
  parse,
  hint: ''
})
