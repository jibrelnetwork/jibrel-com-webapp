import React from 'react'
import cc from 'classcat'

import style from './style.scss'

import { FieldMessageType } from './types'

export interface FieldMessageProps {
  type: FieldMessageType,
  children: React.ReactNode,
}

const FieldMessage: React.FunctionComponent<FieldMessageProps> = ({
  type,
  children,
}) => {
  return (
    <p className={cc([style.message, style[type]])}>{children}</p>
  )
}

FieldMessage.defaultProps = {
  type: FieldMessageType.info,
}

export { FieldMessageType }
export default React.memo(FieldMessage)
