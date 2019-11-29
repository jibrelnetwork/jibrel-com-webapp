import React from 'react'
import cc from 'classcat'

import style from './style.scss'
import { IconName } from './types'

import {
  icons,
  SpriteIcon,
} from '../utils/sprite'

interface IconProps {
  name: IconName,
  className?: string,
}

const Icon: React.FunctionComponent<IconProps> = ({
  name,
  className,
  ...props
}) => {
  const data: SpriteIcon = icons[`${name}-usage`]

  if (!data) {
    return (
      <div
        className={cc([
          style.icon,
          style.empty,
          className,
        ])}
      />
    )
  }

  return (
    <svg
      {...props}
      className={cc([
        style.icon,
        data.colored && style.colored,
        className,
      ])}
      width={data.width}
      height={data.height}
    >
      <use
        key={name}
        xlinkHref={data.url}
      />
    </svg>
  )
}

export default React.memo(Icon)
