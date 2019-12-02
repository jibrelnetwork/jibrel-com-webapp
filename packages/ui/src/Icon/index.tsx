import React from 'react'
import cc from 'classcat'

import style from './style.scss'

import {
  getSprite,
  SpriteIcon,
} from '../utils/sprite'

interface IconProps {
  name: string,
  namespace?: string,
  className?: string,
}

const Icon: React.FunctionComponent<IconProps> = ({
  name,
  className,
  namespace = 'ui',
  ...props
}) => {
  const data: SpriteIcon = getSprite(namespace)[`${name}-usage`]

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

Icon.defaultProps = {
  namespace: undefined,
}

export default React.memo(Icon)
