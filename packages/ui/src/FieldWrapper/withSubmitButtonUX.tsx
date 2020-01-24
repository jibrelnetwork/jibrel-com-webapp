import React from 'react'
import { useForm } from 'react-final-form'

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
    } = useForm().getState()

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
