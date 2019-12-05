import React, { useEffect } from 'react'
import noop from 'lodash-es/noop'
import invoke from 'lodash-es/invoke'

import style from './style.scss'

export enum OptionRenderMode {
  preview,
  dropdown,
}

export interface OptionProps {
  register?: (value: string, searchTerms: string[]) => () => void;
  onSelect?: (value: string) => void;
  value: string;
  label: string;
  mode?: OptionRenderMode;
}

export const Option: React.FunctionComponent<OptionProps> = ({
  register = (): () => void => noop,
  onSelect = noop,
  value,
  mode,
  label,
  children,
  ...props
}) => {
  useEffect(() => register(
    value,
    // FIXME: stub, replace with implementation when custom select design will be required
    [label]
  ), [value, label])

  if (mode === OptionRenderMode.preview) {
    return (
      <div
        className={style.preview}
      >
        {children || label}
      </div>
    )
  }

  // FIXME: stub, replace with implementation when custom select design will be required
  if (mode === OptionRenderMode.dropdown) {
    const handleClick: React.MouseEventHandler = (event) => {
      onSelect(value)
      invoke(props, 'onClick', event)
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
    <option value={value}>{label}</option>
  )
}

export default React.memo(Option)
