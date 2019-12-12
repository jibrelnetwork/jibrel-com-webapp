import React from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'

import { Logo } from '@jibrelcom/ui'
import { LogoColor } from '@jibrelcom/ui/src/Logo/types'

import { UserStatus } from 'store/models/user'

import {
  Dispatch,
  RootState,
} from 'store'

import style from './style.scss'

export interface HeaderProps {
  logout?: () => void;
  className?: string;
  isAuthenticated?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  logout = undefined,
  className,
  isAuthenticated = false,
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
      {isAuthenticated && logout && (
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

export default connect(
  (state: RootState) => ({
    isAuthenticated: (state.user.status !== UserStatus.ANONYMOUS),
  }),
  (dispatch: Dispatch) => ({
    logout: dispatch.user.logout,
  })
)(Header)
