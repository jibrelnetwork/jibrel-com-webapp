import React, { useState } from 'react'
import cc from 'classcat'
import noop from 'lodash-es/noop'
import { useFormState } from 'react-final-form'

import style from './style.scss'
import Indicator from './Indicator'
import { GenericFieldProps } from '../FieldWrapper/types'

import {
  Icon,
  Input,
} from '..'

export interface PasswordInputProps {
  onScoreChange: (score: number) => void,
  label?: string,
  withIndicator?: boolean,
}

const PasswordInput: React.FunctionComponent<GenericFieldProps & PasswordInputProps> = ({
  onScoreChange = noop,
  label = 'Password',
  withIndicator = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const value = useFormState().values.password || ''

  return (
    <div
      className={cc([
        style.password,
        withIndicator && style.padding,
      ])}
    >
      <Input
        {...props}
        label={label}
        value={value}
        type={isOpen ? 'text' : 'password'}
      />
      {withIndicator && (
        <Indicator
          onScoreChange={onScoreChange}
          value={value}
        />
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={style.button}
        type='button'
      >
        <Icon
          className={style.icon}
          name={`ic_visibility_${isOpen ? 'off' : 'on'}_24`}
        />
      </button>
    </div>
  )
}

export default PasswordInput
