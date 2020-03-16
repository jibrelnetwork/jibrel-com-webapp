import React from 'react'
import cc from 'classcat'
import { Link } from 'react-router5'

import Icon from '../Icon'

import style from './style.scss'
import { SmallButtonVariant } from './types'

interface SmallButtonCommonProps {
  iconName?: string;
  className?: string;
  variant?: SmallButtonVariant;
  isDisabled?: boolean;
}

interface AnchorSmallButtonProps
  extends SmallButtonCommonProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['a']> {
  component: 'a';
}

interface LinkSmallButtonProps
  extends SmallButtonCommonProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['a']> {
  component: typeof Link;
  routeName: string;
  routeParams?: object;
}

interface ButtonSmallButtonProps
  extends SmallButtonCommonProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['button']> {
  component: 'button';
}

const SmallButton: React.FunctionComponent<AnchorSmallButtonProps | LinkSmallButtonProps | ButtonSmallButtonProps> = ({
  children,
  iconName,
  className,
  component = 'button',
  variant = SmallButtonVariant.main,
  isDisabled = false,
  ...props
}) => {
  const Component = component

  return (
    <Component
      {...props}
      className={cc([
        style.button,
        style[variant],
        className,
      ])}
      disabled={isDisabled}
    >
      <span className={style.text}>{children}</span>
      {iconName && (
        <Icon
          name={iconName}
          className={style.icon}
        />
      )}
    </Component>
  )
}

export default React.memo(SmallButton)
