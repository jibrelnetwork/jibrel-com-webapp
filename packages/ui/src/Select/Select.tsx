import React, { useState } from 'react'
import cc from 'classcat'
import get from 'lodash-es/get'
import noop from 'lodash-es/noop'

import style from './style.scss'

import { withField, withFieldUX, withMessage } from '../FieldWrapper'
import Icon from '../Icon'

export interface SelectProps {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  hasError?: boolean;
  onChange?: (event: React.ChangeEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  children: React.ReactNode;
}

export const NONE_VALUE = '__none__'

import { getPreviewOption } from './getPreviewOption'

export const Select: React.FunctionComponent<SelectProps> = ({
  label,
  placeholder,
  defaultValue,
  value,
  hasError = false,
  onChange = noop,
  onFocus = noop,
  onBlur = noop,
  children,
}) => {
  const [currentValue, setCurrentValue] = useState(value || defaultValue)
  const [isOpen, setIsOpen] = useState(false)

  const PreviewOption = getPreviewOption(currentValue, placeholder, children)

  const handleChange = (event: React.ChangeEvent): void => {
    setCurrentValue(
      get(event, 'target.value')
    )
    setIsOpen(false)
    onChange(event)
  }

  const handleFocus = (event: React.FocusEvent): void => {
    setIsOpen(true)
    return onFocus(event)
  }

  const handleBlur = (event: React.FocusEvent): void => {
    setIsOpen(false)
    return onBlur(event)
  }

  return (
    <div
      className={cc([
        style.select,
        isOpen && style.isOpen,
        hasError && style.hasError,
      ])}
    >
      <div className={style.content}>
        <div className={style.title}>{label}</div>
        <PreviewOption />
      </div>
      <Icon
        className={style.icon}
        name={isOpen ? 'ic_arrow_up_24' : 'ic_arrow_down_24'}
        namespace='ui'
      />
      <select
        onChange={handleChange}
        value={currentValue || NONE_VALUE}
        className={style.native}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {placeholder && (
          <option
            value={NONE_VALUE}
            disabled
          >
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  )
}

export default withField(withFieldUX(React.memo(withMessage(Select))))
