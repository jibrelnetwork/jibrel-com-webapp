import React from 'react'
import cc from 'classcat'

import { LabelColor } from './types'

import style from './style.scss'

interface LabelProps {
  className?: string;
  color: LabelColor;
}

type LabelComponent = React.FunctionComponent<LabelProps> & {
  color: typeof LabelColor;
}

export const LabelImplementation: React.FunctionComponent<LabelProps> = ({
  className,
  color,
  ...props
}) => (
  <span
    className={cc([
      style.label,
      style[color],
      className,
    ])}
    {...props}
  />
)

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore-next-line, comment: React.memo destroys static props of component, so we need this hack
const Label: LabelComponent = React.memo(LabelImplementation)

Label.color = LabelColor

export default Label
