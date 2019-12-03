import React from 'react'

import { getMessage } from './getMessage'

import { GenericFieldProps } from './types'
import { WithMessageProps } from './withMessage'

export interface WithFieldUXWrapperProps extends GenericFieldProps {
  hint?: string;
  success?: string;
  className?: string;
  children: React.ReactNode;
}

export const withFieldUX = <P extends React.PropsWithoutRef<JSX.IntrinsicElements['input']>>(Component: React.ComponentType<P & WithMessageProps>): React.FunctionComponent<P & WithFieldUXWrapperProps & GenericFieldProps> => {
  const WithFieldUXWrapper: React.FunctionComponent<P & WithFieldUXWrapperProps & GenericFieldProps> = ({
    meta,
    hint,
    success,
    input,
    ...props
  }) => {
    const message = getMessage({
      meta,
      hint,
      success,
    })

    return <Component
      {...props as P}
      {...message}
      {...input}
    />
  }

  return WithFieldUXWrapper
}
