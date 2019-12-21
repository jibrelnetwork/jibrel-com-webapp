import React, { useState } from 'react'
import cc from 'classcat'
import noop from 'lodash-es/noop'
import { useFormState } from 'react-final-form'

import style from './style.scss'
import Indicator from './Indicator'
import { CheckPasswordStrengthHandler } from './types'
import { GenericFieldProps } from '../FieldWrapper/types'

import {
  Icon,
  Input,
} from '..'

export interface PasswordInputProps {
  onScoreChange?: (score: number) => void;
  checkPasswordStrength?: CheckPasswordStrengthHandler;
  userInputs?: string[];
  label?: string;
  withIndicator?: boolean;
}

const PasswordInput: React.FunctionComponent<GenericFieldProps & PasswordInputProps> = ({
  onScoreChange = noop,
  checkPasswordStrength = undefined,
  userInputs,
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
        classNames={style}
        type={isOpen ? 'text' : 'password'}
      />
      {withIndicator && checkPasswordStrength && (
        <Indicator
          onScoreChange={onScoreChange}
          checkPasswordStrength={checkPasswordStrength}
          userInputs={userInputs}
          value={value}
        />
      )}
      <button
        onClick={(): void => setIsOpen(!isOpen)}
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
