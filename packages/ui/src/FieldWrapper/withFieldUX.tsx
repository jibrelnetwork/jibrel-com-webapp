import React from 'react'
import { useFormState } from 'react-final-form'

import { getMessage } from './getMessage'

import { GenericFieldProps, MessageType } from './types'
import { WithMessageProps } from './withMessage'

export interface WithFieldUXWrapperProps extends GenericFieldProps {
  hint?: string;
  success?: string;
}

export const withFieldUX = <P extends React.PropsWithoutRef<JSX.IntrinsicElements['input']>>(Component: React.ComponentType<P & WithMessageProps>): React.FunctionComponent<P & WithFieldUXWrapperProps & GenericFieldProps> => {
  const WithFieldUXWrapper: React.FunctionComponent<P & WithFieldUXWrapperProps & GenericFieldProps> = ({
    meta,
    input,
    hint,
    success,
    ...props
  }) => {
    const { submitting } = useFormState({
      subscription: {
        submitting: true
      }
    })

    const message = getMessage({
      meta,
      hint,
      success,
    })

    return <Component
      {...props as P}
      {...message}
      {...input}
      hasError={message.messageType === MessageType.error}
      isDisabled={props.isDisabled || submitting}
    />
  }

  return WithFieldUXWrapper
}
