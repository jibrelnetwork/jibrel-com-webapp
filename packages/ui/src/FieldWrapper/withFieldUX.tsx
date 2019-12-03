import React from 'react'
import { FieldInputProps, FieldMetaState, FieldProps, FieldRenderProps, useFormState } from 'react-final-form'

import { getMessage } from './getMessage'

export interface WithFieldUXWrapperProps extends FieldProps<any, FieldRenderProps<any, HTMLElement>> {
  meta: FieldMetaState<any>;
  hint?: string;
  success?: string;
  input: FieldInputProps<any>;
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
