import React from 'react'

import {
  Grid,
  SmallButton,
} from '@jibrelcom/ui'

import settings from 'app/settings'

import style from './style.scss'

const Empty: React.FunctionComponent = () => (
  <Grid.Item
    className={style.main}
    xs={4}
    s={4}
    m={4}
    l={4}
  >
    <div className={style.title}>
      Make Your First Investment
    </div>
    <a
      className={style.link}
      href={settings.HOST_CMS}
    >
      <SmallButton className={style.button}>
        To startups
      </SmallButton>
    </a>
  </Grid.Item>
)

export default Empty
