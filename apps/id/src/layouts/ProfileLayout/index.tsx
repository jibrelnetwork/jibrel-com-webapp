import React from 'react'
import cc from 'classcat'
import { centered } from '@jibrelcom/ui/src/theme/grid.scss'
import Header from 'components/Header'

import style from './style.scss'

const ProfileLayout: React.FunctionComponent = ({
  children,
}) => {
  return (
    <div className={style.wrapper}>
      <Header />
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

export default ProfileLayout
