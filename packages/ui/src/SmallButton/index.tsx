import React from 'react'
import cc from 'classcat'

import Icon from '../Icon'

import style from './style.scss'

interface SmallButtonProps extends React.PropsWithoutRef<JSX.IntrinsicElements['button']> {
  className?: string;
  isDisabled?: boolean;
  iconName?: string;
  children: React.ReactNode;
}

const SmallButton: React.FunctionComponent<SmallButtonProps> = ({
  className,
  isDisabled = false,
  iconName,
  children,
  ...props
}) => (
  <button
    {...props}
    className={cc([
      style.button,
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
  </button>
)

export default React.memo(SmallButton)
