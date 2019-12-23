import React from 'react'
import cc from 'classcat'
import { centered } from '@jibrelcom/ui/src/theme/grid.scss'

import {
  Footer,
  Header,
} from 'components'

import style from './style.scss'

const ProfileLayout: React.FunctionComponent = ({
  children,
}) => {
  return (
    <div className={style.wrapper}>
      <Header />
      <main
        className={cc([
          style.content,
          centered,
        ])}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default ProfileLayout
