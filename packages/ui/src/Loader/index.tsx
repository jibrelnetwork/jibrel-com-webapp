import React from 'react'
import cc from 'classcat'

import style from './style.scss'
import { LoaderColor } from './types'

export interface LoaderProps {
  className?: string;
  color?: LoaderColor | void;
}

export type LoaderComponent = React.FunctionComponent<LoaderProps> & {
  color: typeof LoaderColor;
}

const LoaderImplementation: React.FunctionComponent<LoaderProps> = ({
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

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore-next-line, comment: React.memo destroys static props of component, so we need this hack
const Loader: LoaderComponent = React.memo(LoaderImplementation)

Loader.color = LoaderColor

export default Loader
