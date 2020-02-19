import React from 'react'
import { useI18n } from '@jibrelcom/i18n'

import {
  Grid,
  SmallButton,
} from '@jibrelcom/ui'

import settings from 'app/settings'

import style from './style.scss'

const Empty: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <Grid.Item
      className={style.main}
      xs={4}
      s={4}
      m={4}
      l={4}
    >
      <div className={style.title}>
        {i18n._('Portfolio.empty.title')}
      </div>
      <a
        className={style.link}
        href={settings.HOST_CMS}
      >
        <SmallButton className={style.button}>
          {i18n._('Portfolio.empty.action')}
        </SmallButton>
      </a>
    </Grid.Item>
  )
}

export default Empty
