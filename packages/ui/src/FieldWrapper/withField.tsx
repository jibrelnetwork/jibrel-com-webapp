import React from 'react'
import { Field, FieldRenderProps } from 'react-final-form'

export const withField = <P extends React.PropsWithoutRef<JSX.IntrinsicElements['input']>>(Component: React.ComponentClass<FieldRenderProps<any, HTMLElement>, P>): React.FunctionComponent<P> => {
  const WithFinalFormFieldWrapper: React.FunctionComponent = (props) => (
    <Field
      {...props}
      component={Component}
    />
  )

  return WithFinalFormFieldWrapper
}
