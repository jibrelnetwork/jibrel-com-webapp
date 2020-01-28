import React from 'react'
import cc from 'classcat'

import Icon from '../Icon'
import style from './style.scss'

export interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const Warning: React.FunctionComponent<PageTitleProps> = ({
  children,
  className = undefined,
}) => (
  <div className={cc([style.main, className])}>
    <Icon
      name='ic_exclamation_24'
      className={style.exclamation}
    />
    <span>{children}</span>
  </div>
)

export default React.memo(Warning)