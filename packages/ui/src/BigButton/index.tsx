import React from 'react'
import cc from 'classcat'
import { Link } from 'react-router5'

import style from './style.scss'
import loader from '../Loader/style.scss'
import { BigButtonVariant } from './types'
import { withSubmitButtonUX } from '../FieldWrapper'

export interface CommonBigButtonProps {
  className?: string;
  id?: string;
  type?: string;
  variant?: BigButtonVariant;
  isLoading?: boolean;
  isDisabled?: boolean;
}

interface AnchorBigButtonProps
  extends CommonBigButtonProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['a']> {
  component: 'a';
}

interface LinkBigButtonProps
  extends CommonBigButtonProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['a']> {
  component: typeof Link;
  routeName: string;
  routeParams?: object;
}

interface ButtonBigButtonProps
  extends CommonBigButtonProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['button']> {
  component: 'button';
}

const BigButton: React.FunctionComponent<AnchorBigButtonProps | LinkBigButtonProps | ButtonBigButtonProps> = ({
  variant = BigButtonVariant.main,
  component = 'button',
  id,
  type,
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
      id ={id || `t_${type}`}
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
