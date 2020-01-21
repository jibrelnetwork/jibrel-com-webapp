import React from 'react'
import cc from 'classcat'

import style from './style.scss'

interface ErrorToastProps {
  children: string | React.ReactNode;
  className?: string;
}

const ErrorToast: React.FunctionComponent<ErrorToastProps> = ({
  children ,
  className,
  ...props
}) => {
  return (
    <div
      role='alert'
      className={cc([style.container, className])}
      {...props}
    >
      {children}
    </div>
  )
}

export default React.memo(ErrorToast)
