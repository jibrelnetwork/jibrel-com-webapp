import React from 'react'
import cc from 'classcat'

import style from './style.scss'

import { IconName } from './types'

interface IconProps {
  name: IconName,
  className?: string,
}

const Icon: React.FunctionComponent<IconProps> = ({
  name,
  className,
  ...props
}) => (
  <svg
    {...props}
    key={name}
    className={cc([
      style.icon,
      className,
    ])}
    width='24'
    height='24'
  />
)

export default React.memo(Icon)
