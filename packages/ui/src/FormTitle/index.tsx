import React from 'react'
import cc from 'classcat'

import style from './style.scss'

export interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const FormTitle: React.FunctionComponent<PageTitleProps> = ({
  children,
  className = undefined,
}) => (
  <h2 className={cc([style.main, className])}>{children}</h2>
)

export default React.memo(FormTitle)