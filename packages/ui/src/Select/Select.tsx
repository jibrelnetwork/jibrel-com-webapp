import React, { useState } from 'react'
import get from 'lodash-es/get'
import noop from 'lodash-es/noop'

import style from './style.scss'

import Icon from '../Icon'

export interface SelectProps {
  title: string,
  placeholder?: string,
  defaultValue?: string,
  value?: string,
  onChange: (event: React.ChangeEvent) => void,
}

export const NONE_VALUE = '__none__'

import { getPreviewOption } from './getPreviewOption'

export const Select: React.FunctionComponent<SelectProps> = ({
  title,
  placeholder,
  defaultValue,
  value,
  onChange = noop,
  children,
}) => {
  const [currentValue, setCurrentValue] = useState(value || defaultValue)
  const [isOpen, setIsOpen] = useState(false)

  const PreviewOption = getPreviewOption(currentValue, placeholder, children)

  const handleChange = (event: React.ChangeEvent) => {
    setCurrentValue(
      get(event, 'target.value')
    )
    setIsOpen(false)
    onChange(event)
  }

  return (
    <div className={style.select}>
      <div className={style.content}>
        <div className={style.title}>{title}</div>
        <PreviewOption />
      </div>
      <Icon
        className={style.icon}
        name={isOpen ? 'arrow-up' : 'arrow-down'}
      />
      <select
        onChange={handleChange}
        value={currentValue || NONE_VALUE}
        className={style.native}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
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

export default React.memo(Select)
