import React from 'react'
import cc from 'classcat'
import { centered } from '@jibrelcom/ui/src/theme/grid.scss'

import style from './style.scss'

const AuthenticatedLayout: React.FunctionComponent = ({
  children,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>Menu</div>
      <main className={cc([
        style.content,
        centered,
      ])}>
        {children}
      </main>
      <footer className={style.footer}>Footer</footer>
    </div>
  )
}

export default AuthenticatedLayout
