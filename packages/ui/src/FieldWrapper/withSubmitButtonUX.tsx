import React from 'react'
import { useFormState } from 'react-final-form'

const getIsDiabled = ({
  hasSubmitErrors,
  hasValidationErrors,
  dirtySinceLastSubmit,
}: {
  hasSubmitErrors: boolean;
  hasValidationErrors: boolean;
  dirtySinceLastSubmit: boolean;
}): boolean => {
  if (hasValidationErrors) {
    return true
  }

  if (hasSubmitErrors && !dirtySinceLastSubmit) {
    return true
  }

  return false
}

export const withSubmitButtonUX = <P extends React.PropsWithoutRef<JSX.IntrinsicElements['button']>>(ButtonComponent: React.ComponentType<P>): React.FunctionComponent<P> => {
  const WithSubmitButtonUXWrapper: React.FunctionComponent<P> = ({
    ...props
  }) => {
    const {
      submitting,
      hasSubmitErrors,
      hasValidationErrors,
      dirtySinceLastSubmit,
      validating,
    } = useFormState({
      subscription: {
        submitting: true,
        hasSubmitErrors: true,
        hasValidationErrors: true,
        dirtySinceLastSubmit: true,
        validating: true,
      }
    })
    const isDisabled = getIsDiabled({
      hasSubmitErrors,
      hasValidationErrors,
      dirtySinceLastSubmit,
    })

    return <ButtonComponent
      {...props as P}
      type='submit'
      isLoading={validating || submitting}
      isDisabled={isDisabled}
    />
  }

  return WithSubmitButtonUXWrapper
}
