import React from 'react'
import cc from 'classcat'

import style from './style.scss'
import loader from '../Loader/style.scss'
import { BigButtonVariant } from './types'
import { withSubmitButtonUX } from '../FieldWrapper'

export interface BigButtonProps extends React.PropsWithoutRef<JSX.IntrinsicElements['button']> {
  href?: string;
  variant?: BigButtonVariant;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const BigButton: React.FunctionComponent<BigButtonProps> = ({
  variant = BigButtonVariant.main,
  className,
  isLoading = false,
  isDisabled = false,
  href,
  children,
  ...props
}) => {
  const Component = href === undefined
    ? 'button'
    : 'a'

  return (
    <Component
      {...props}
      href={href}
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
