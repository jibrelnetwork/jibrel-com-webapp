import React, { useEffect } from 'react'
import noop from 'lodash-es/noop'
import invoke from 'lodash-es/invoke'

import style from './style.scss'

export enum OptionRenderMode {
  preview,
  dropdown,
}

export interface OptionProps {
  register?: (value: string, searchTerms: string[]) => () => void,
  onSelect?: (value: string) => void,
  value: string,
  title: string,
  mode?: OptionRenderMode,
}

export const Option: React.FunctionComponent<OptionProps> = ({
  register = () => noop,
  onSelect = noop,
  value,
  mode,
  title,
  children,
  ...props
}) => {
  useEffect(() => register(
    value,
    // FIXME: stub, replace with implementation when custom select design will be required
    [title]
  ), [value, title])

  if (mode === OptionRenderMode.preview) {
    return (
      <div
        className={style.preview}
      >
        {children || title}
      </div>
    )
  }

  // FIXME: stub, replace with implementation when custom select design will be required
  if (mode === OptionRenderMode.dropdown) {
    const handleClick = (...args: any[]) => {
      onSelect(value)
      invoke(props, 'onClick', ...args)
    }

    return (
      <div
        onClick={handleClick}
      >
        {children}
      </div>
    )
  }

  return (
    <option value={value}>{title}</option>
  )
}

export default React.memo(Option)
