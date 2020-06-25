import React, { useState } from 'react'
import cc from 'classcat'
import noop from 'lodash-es/noop'
import { useI18n } from '@jibrelcom/i18n'
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
  name:string;
  id?: string;
  userInputs?: string[];
  label?: string;
  withIndicator?: boolean;
}

const PasswordInput: React.FunctionComponent<GenericFieldProps & PasswordInputProps> = ({
  onScoreChange = noop,
  checkPasswordStrength = undefined,
  id,
  name,
  userInputs,
  label,
  withIndicator = false,
  ...props
}) => {
  const i18n = useI18n()
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
        name={name}
        id={id || `t_${name}`}
        value={value}
        classNames={style}
        type={isOpen ? 'text' : 'password'}
        label={label || i18n._('form.password.label')}
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
        id={`t_open_${name}`}
        name={name}
        className={style.button}
        type='button'
      >
        <Icon
          className={style.icon}
          name={`ic_visibility_${isOpen ? 'on' : 'off'}_24`}
        />
      </button>
    </div>
  )
}

export default PasswordInput
