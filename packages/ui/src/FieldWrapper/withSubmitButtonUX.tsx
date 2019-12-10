import React from 'react'
import { useFormState } from 'react-final-form'

export const withSubmitButtonUX = <P extends React.PropsWithoutRef<JSX.IntrinsicElements['button']>>(ButtonComponent: React.ComponentType<P>): React.FunctionComponent<P> => {
  const WithSubmitButtonUXWrapper: React.FunctionComponent<P> = ({
    ...props
  }) => {
    const {
      submitting,
      invalid,
      validating,
    } = useFormState({
      subscription: {
        submitting: true,
        invalid: true,
        validating: true,
      }
    })

    return <ButtonComponent
      {...props as P}
      type='submit'
      isLoading={validating || submitting}
      isDisabled={invalid}
    />
  }

  return WithSubmitButtonUXWrapper
}
