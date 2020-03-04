import React from 'react'
import { Grid } from '@jibrelcom/ui'
import { useI18n } from '@jibrelcom/i18n'

import style from './style.scss'

const Empty: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <Grid.Container className={style.main}>
      <Grid.Item
        className={style.title}
        component='h3'
      >
        {i18n._('Portfolio.empty.title')}
      </Grid.Item>
      <Grid.Item
        xs={4}
        s={8}
        m={4}
        l={4}
        xl={4}
        component='p'
        className={style.description}
      >
        {i18n._('Portfolio.empty.description')}
      </Grid.Item>
    </Grid.Container>
  )
}

export default Empty
