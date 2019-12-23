import React from 'react'
import { Field } from 'react-final-form'
import mapValues from 'lodash-es/mapValues'
import isFunction from 'lodash-es/isFunction'

import { GenericFieldProps, GenericFieldRenderProps } from './types'

export const withField = <P extends React.PropsWithoutRef<JSX.IntrinsicElements['input']>>(
  Component: React.ComponentType<P & GenericFieldRenderProps>,
  staticProps: object = {},
): React.FunctionComponent<P & GenericFieldProps> => {
  const WithFinalFormFieldWrapper: React.FunctionComponent<P & GenericFieldProps> = (props) => (
    <Field
      {...mapValues(staticProps, (staticProp) =>
        isFunction(staticProp)
          ? staticProp(props)
          : staticProp
      )}
      {...props}
      component={Component}
    />
  )

  return WithFinalFormFieldWrapper
}
