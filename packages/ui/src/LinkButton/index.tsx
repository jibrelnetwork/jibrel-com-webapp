import React from 'react'
import cc from 'classcat'

import style from './style.scss'

import Icon from '../Icon'

import { LinkButtonVariant } from './types'

export interface LinkButtonProps extends React.PropsWithoutRef<JSX.IntrinsicElements['button']> {
  variant?: LinkButtonVariant;
  className?: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const LinkButton: React.FunctionComponent<LinkButtonProps> = ({
  variant,
  className,
  isDisabled = false,
  children,
  ...props
}) => (
  <button
    {...props}
    className={cc([
      style.button,
      variant && style[variant],
      className,
    ])}
    disabled={isDisabled}
  >
    <Icon
      name='left-arrow'
      className={cc([
        style.icon,
        style.left,
      ])}
    />
    <span className={style.text}>{children}</span>
    <Icon
      name='right-arrow'
      className={cc([
        style.icon,
        style.right,
      ])}
    />
  </button>
)

export default React.memo(LinkButton)
