import React from 'react'
import { FieldInputProps, FieldMetaState, useFormState } from 'react-final-form'

import { getMessage } from './getMessage'

import { GenericFieldProps, GenericFieldValue } from './types'

export interface WithFieldUXWrapperProps extends GenericFieldProps {
  meta: FieldMetaState<GenericFieldValue>;
  hint?: string;
  success?: string;
  input: FieldInputProps<GenericFieldValue>;
  className?: string;
  children: React.ReactNode;
}

export const withFieldUX = <P extends React.PropsWithoutRef<JSX.IntrinsicElements['input']>>(Component: React.ComponentType<P>): React.FunctionComponent<P & WithFieldUXWrapperProps> => {
  const WithFieldUXWrapper: React.FunctionComponent<P & WithFieldUXWrapperProps> = ({
    meta,
    hint,
    success,
    input,
    ...props
  }) => {
    const { dirtySinceLastSubmit } = useFormState()

    const message = getMessage({
      meta,
      dirtySinceLastSubmit,
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
