import React from 'react'
import cc from 'classcat'

import style from './style.scss'

export interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle: React.FunctionComponent<PageTitleProps> = ({
  children,
  className = undefined,
}) => (
  <h1 className={cc([style.main, className])}>{children}</h1>
)

export default React.memo(PageTitle)