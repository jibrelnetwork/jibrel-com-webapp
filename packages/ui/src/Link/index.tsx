import React from 'react'
import cc from 'classcat'

import linkButtonStyle from '../LinkButton/style.scss'
import style from './style.scss'

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
      linkButtonStyle.button,
      style.link,
      className,
    ])}
  >
    <span className={linkButtonStyle.text}>{children}</span>
  </a>
)

export default React.memo(Link)
