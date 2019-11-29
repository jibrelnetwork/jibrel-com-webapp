import React from 'react'
import get from 'lodash-es/get'

import style from './style.scss'

import Option, { OptionRenderMode } from './Option'

export const getPreviewOption = (
  value: string | void,
  placeholder: string | void,
  children: React.ReactNode,
): React.FunctionComponent => {
  const preview = React.Children.toArray(children)
    .find(child => get(child, 'props.value') === value)

  if (!preview || !React.isValidElement(preview)) {
    return () => (
      <div className={style.placeholder}>{placeholder || ''}</div>
    )
  }

  return () => (
    <Option
      {...preview.props}
      mode={OptionRenderMode.preview}
    />
  )
}
