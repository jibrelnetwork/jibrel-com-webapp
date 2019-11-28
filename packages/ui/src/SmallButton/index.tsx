import React from 'react'
import cc from 'classcat'

import Icon from '../Icon'
import { IconName } from '../Icon/types'

import style from './style.scss'

interface SmallButtonProps {
  className?: string,
  isDisabled?: boolean,
  iconName?: IconName,
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
