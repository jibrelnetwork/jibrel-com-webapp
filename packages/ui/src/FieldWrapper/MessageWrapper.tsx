import React, { ReactNode } from 'react'
import cc from 'classcat'

import { MessageType } from './types'
import style from './style.scss'

export interface MessageWrapperProps {
  children: ReactNode;
  name?: string;
  message?: string;
  className?: string;
  messageType?: MessageType;
}

export const MessageWrapper: React.FunctionComponent<MessageWrapperProps> = ({
  name,
  message,
  messageType,
  className,
  children,
}) => {
  return (
    <div
      className={cc([
        style.wrapper,
        messageType && style[messageType],
        className,
      ])}
    >
      {children}
      <p
        id={`t_${name}-message`}
        className={style.message}
      >
        {message}
      </p>
    </div>
  )
}

export default React.memo(MessageWrapper)
