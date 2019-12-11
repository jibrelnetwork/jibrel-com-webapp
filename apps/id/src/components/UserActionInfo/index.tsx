import React from 'react'
import cc from 'classcat'
import { Icon } from '@jibrelcom/ui'

import style from './style.scss'

export interface UserActionInfoProps {
  title: string;
  iconName: string;
  className?: string;
  children: React.ReactNode;
}

const UserActionInfo: React.FunctionComponent<UserActionInfoProps> = ({
  title,
  iconName,
  children,
  className,
}) => {
  return (
    <div
      className={cc([
        style.main,
        className,
      ])}
    >
      <div className={style.icon}>
        <Icon name={`ic_${iconName}_48`} />
      </div>
      <h2 className={style.title}>
        {title}
      </h2>
      <div className={style.content}>
        {children}
      </div>
    </div>
  )
}

export default UserActionInfo
