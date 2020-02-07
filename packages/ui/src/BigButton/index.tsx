import React from 'react'
import cc from 'classcat'

import style from './style.scss'
import loader from '../Loader/style.scss'
import { BigButtonVariant } from './types'
import { withSubmitButtonUX } from '../FieldWrapper'

export interface BigButtonCommonProps {
  className?: string;
  variant?: BigButtonVariant;
  isLoading?: boolean;
  isDisabled?: boolean;
}

interface LinkBigButtonProps
  extends BigButtonCommonProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['a']> {
  component: 'a';
}

interface ButtonBigButtonProps
  extends BigButtonCommonProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['button']> {
  component: 'button';
}

const BigButton: React.FunctionComponent<LinkBigButtonProps | ButtonBigButtonProps> = ({
  variant = BigButtonVariant.main,
  component = 'button',
  className,
  isLoading = false,
  isDisabled = false,
  children,
  ...props
}) => {
  const Component = component

  return (
    <Component
      {...props}
      className={cc([
        style.button,
        style[variant],
        isLoading && style.loading,
        className,
      ])}
      disabled={isDisabled}
    >
      {!isLoading ? children : (
        <div
          className={cc([
            style.loader,
            loader.loader,
          ])}>
          <div className={cc([style.dot, loader.dot, loader.first])} />
          <div className={cc([style.dot, loader.dot, loader.second])} />
          <div className={cc([style.dot, loader.dot, loader.third])} />
        </div>
      )}
    </Component>
  )
}

export default React.memo(BigButton)

export const BigButtonSubmit = withSubmitButtonUX(BigButton)
