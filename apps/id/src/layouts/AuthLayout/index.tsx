import React from 'react'

import style from './style.scss'
import Header from 'components/Header'

export interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FunctionComponent<AuthLayoutProps> = ({ children }) => (
  <>
    <Header />
    <div className={style.content}>
      {children}
    </div>
  </>
)

export default AuthLayout
