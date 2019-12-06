import React from 'react'
import cc from 'classcat'

import style from './style.scss'

import { BigButtonVariant } from './types'

export interface BigButtonProps extends React.PropsWithoutRef<JSX.IntrinsicElements['button']> {
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
  children,
  ...props
}) => (
  <button
    {...props}
    className={cc([
      style.button,
      style[variant],
      className,
    ])}
    disabled={isDisabled}
  >
    {isLoading ? '...' : children}
  </button>
)

export default React.memo(BigButton)
