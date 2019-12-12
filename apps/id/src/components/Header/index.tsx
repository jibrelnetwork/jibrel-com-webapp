import React from 'react'
import cc from 'classcat'

import { Logo } from '@jibrelcom/ui'
import { LogoColor } from '@jibrelcom/ui/src/Logo/types'

import style from './style.scss'

export interface HeaderProps {
  logout?: () => void;
  className?: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  logout,
  className,
  ...props
}) => (
  <div
    {...props}
    className={cc([
      style.header,
      className,
    ])}
  >
    <div className={style.main}>
      <a
        href='/'
        className={style.logo}
      >
        <Logo color={LogoColor.blue} />
      </a>
      <a
        href='#'
        className={style.action}
      >
        SUPPORT
      </a>
      {logout && (
        <button
          type='button'
          onClick={logout}
          className={style.action}
        >
          LOG OUT
        </button>
      )}
    </div>
  </div>
)

export default React.memo(Header)
