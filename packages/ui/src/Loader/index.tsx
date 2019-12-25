import React from 'react'
import cc from 'classcat'

import style from './style.scss'
import { LoaderColor } from './types'

export interface LoaderProps {
  className?: string;
  color?: LoaderColor | void;
}

const Loader: React.FunctionComponent<LoaderProps> = ({
  color,
  className,
}) => (
  <div
    className={cc([
      style.loader,
      color && style[color],
      className,
    ])}>
    <div className={cc([style.dot, style.first])} />
    <div className={cc([style.dot, style.second])} />
    <div className={cc([style.dot, style.third])} />
  </div>
)

export default React.memo(Loader)