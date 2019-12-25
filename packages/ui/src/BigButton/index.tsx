import React, { useState } from 'react'
import cc from 'classcat'

import Loader from '../Loader'
import style from './style.scss'
import { BigButtonVariant } from './types'
import { LoaderColor } from '../Loader/types'
import { withSubmitButtonUX } from '../FieldWrapper'

export interface BigButtonProps extends React.PropsWithoutRef<JSX.IntrinsicElements['button']> {
  variant?: BigButtonVariant;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const BigButton: React.FunctionComponent<BigButtonProps> = ({
  onMouseEnter,
  onMouseLeave,
  variant = BigButtonVariant.main,
  className,
  isLoading = false,
  isDisabled = false,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setIsHovered(true)

    if (onMouseEnter) {
      onMouseEnter(e)
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setIsHovered(false)

    if (onMouseLeave) {
      onMouseLeave(e)
    }
  }

  return (
    <button
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cc([
        style.button,
        style[variant],
        isLoading && style.loading,
        className,
      ])}
      disabled={isDisabled}
    >
      {!isLoading
        ? children
        : <Loader color={isHovered ? LoaderColor.blue : LoaderColor.white} />
      }
    </button>
  )
}

export default React.memo(BigButton)

export const BigButtonSubmit = withSubmitButtonUX(BigButton)
