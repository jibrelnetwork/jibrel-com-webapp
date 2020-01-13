import React from 'react'
import cc from 'classcat'

import style from '../LinkButton/style.scss'

export interface LinkProps extends React.PropsWithoutRef<JSX.IntrinsicElements['a']> {
  className?: string;
  children: React.ReactNode;
}

const Link: React.FunctionComponent<LinkProps> = ({
  className,
  children,
  ...props
}) => (
  <a
    {...props}
    className={cc([
      style.button,
      className,
    ])}
  >
    <span className={style.text}>{children}</span>
  </a>
)

export default React.memo(Link)
