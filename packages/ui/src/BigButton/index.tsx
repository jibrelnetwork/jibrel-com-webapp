import React from 'react'
import cc from 'classcat'

import style from './style.scss'

import { BigButtonVariant } from './types'

export interface BigButtonProps {
  variant?: BigButtonVariant,
  className?: string,
  isDisabled?: boolean,
}

const BigButton: React.FunctionComponent<BigButtonProps> = ({
  variant = BigButtonVariant.main,
  className,
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
    {children}
  </button>
)

export default React.memo(BigButton)
