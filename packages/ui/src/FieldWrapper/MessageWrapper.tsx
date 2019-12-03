import React, { ReactNode } from 'react'
import cc from 'classcat'

import { MessageType } from './types'
import style from './style.scss'

export interface MessageWrapperProps {
  message: string;
  messageType: MessageType;
  className?: string;
  children: ReactNode;
}

export const MessageWrapper: React.FunctionComponent<MessageWrapperProps> = ({
  message,
  messageType,
  className,
  children,
}) => {
  return (
    <div className={cc([style.wrapper, style[messageType], className])}>
      {children}
      <p className={style.message}>{message}</p>
    </div>
  )
}

export default React.memo(MessageWrapper)
