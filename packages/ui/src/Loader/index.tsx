import React from 'react'
import cc from 'classcat'

import style from './style.scss'
import { LoaderColor } from './types'

export interface LoaderProps {
  color?: LoaderColor;
  hoverColor?: LoaderColor;
  className?: string;
}

const Loader: React.FunctionComponent<LoaderProps> = ({
  color = LoaderColor.blue,
  hoverColor = LoaderColor.blue,
  className,
}) => (
  <div
    className={cc([
      style.loader,
      style[color],
      style[`hover-${hoverColor}`],
      className,
    ])}>
    <div className={cc([style.dot, style.first])} />
    <div className={cc([style.dot, style.second])} />
    <div className={cc([style.dot, style.third])} />
  </div>
)

export default React.memo(Loader)