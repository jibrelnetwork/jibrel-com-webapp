import React from 'react'

import { getMessage } from './getMessage'

import { GenericFieldProps } from './types'
import { WithMessageProps } from './withMessage'
import { useFormState } from 'react-final-form'

export interface WithDependentFieldUXWrapperProps extends GenericFieldProps {
  hint?: string;
  success?: string;
  dependencies: string[];
}

export const withDependenciesFieldUX = <P extends React.PropsWithoutRef<JSX.IntrinsicElements['input']>>(Component: React.ComponentType<P & WithMessageProps>): React.FunctionComponent<P & WithDependentFieldUXWrapperProps & GenericFieldProps> => {
  const WithDependentFieldUXWrapper: React.FunctionComponent<P & WithDependentFieldUXWrapperProps & GenericFieldProps> = ({
    meta,
    input,
    hint,
    success,
    dependencies,
    ...props
  }) => {
    const { dirtyFieldsSinceLastSubmit } = useFormState({
      subscription: {
        dirtyFieldsSinceLastSubmit: true
      }
    })

    // if one of dependencies changed, we should not display server validation error
    const isDependencyChanged = !!dependencies.find(
      (key) => dirtyFieldsSinceLastSubmit[key]
    )

    const message = getMessage({
      meta,
      hint,
      success,
      isDependencyChanged,
    })

    return <Component
      {...props as P}
      {...message}
      {...input}
    />
  }

  return WithDependentFieldUXWrapper
}
