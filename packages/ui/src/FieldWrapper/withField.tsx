import React from 'react'
import { Field } from 'react-final-form'

import { GenericFieldProps, GenericFieldRenderProps } from './types'

export const withField = <P extends React.PropsWithoutRef<JSX.IntrinsicElements['input']>>(Component: React.ComponentClass<GenericFieldRenderProps>): React.FunctionComponent<P & GenericFieldProps> => {
  const WithFinalFormFieldWrapper: React.FunctionComponent<P & GenericFieldProps> = (props) => (
    <Field
      {...props}
      component={Component}
    />
  )

  return WithFinalFormFieldWrapper
}
