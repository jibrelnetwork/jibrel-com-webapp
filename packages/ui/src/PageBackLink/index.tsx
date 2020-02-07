import React from 'react'
import cc from 'classcat'

import style from './style.scss'

import {
  Icon,
  Link,
  InternalLink,
} from '../'

export interface PageBackLinkProps {
  children: React.ReactNode;
  href?: string;
  route?: string;
  className?: string;
}

const PageBackLink: React.FunctionComponent<PageBackLinkProps> = ({
  children,
  href = undefined,
  route = undefined,
  className = undefined,
}) => (
  <div className={cc([style.main, className])}>
    <Icon
      className={style.icon}
      name='ic_arrow_right_24'
    />
    {href && !route && <Link href={href}>{children}</Link>}
    {!href && route && <InternalLink name={route}>{children}</InternalLink>}
  </div>
)

export default React.memo(PageBackLink)