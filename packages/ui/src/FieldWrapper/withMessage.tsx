import React from 'react'

import { FormValidateType } from '../utils/forms/getErrorMessage'

import MessageWrapper from './MessageWrapper'
import { MessageType } from './types'

export interface WithMessageProps {
  message: string;
  messageType: MessageType;
  validateType: FormValidateType;
  className: string;
  children: React.ReactNode;
}

export const withMessage = <P extends React.PropsWithoutRef<JSX.IntrinsicElements['input']>>(InputComponent: React.ComponentType<P>): React.FunctionComponent<P & WithMessageProps> => {
  const WithMessage: React.FunctionComponent<P & WithMessageProps> = ({
    message,
    className,
    messageType,
    ...props
  }) => (
    <MessageWrapper
      message={message}
      messageType={messageType}
      className={className}
    >
      <InputComponent
        {...props as P}
      />
    </MessageWrapper>
  )

  return WithMessage
}
