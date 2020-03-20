import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
import {
  Animation,
  FormTitle,
  Grid
} from '@jibrelcom/ui'

import style from '../../style.scss'

const Loading: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <Grid.Container
      component='article'
      className={style.loadingContainer}
    >
      <Grid.Item
        className={style.header}
        s={3}
        m={3}
        l={5}
        xl={5}
      >
        <Animation.Component
          loadAnimation={Animation.loaders.hourglass}
          loop
        />
      </Grid.Item>
      <Grid.Item
        className={style.body}
        s={5}
        m={5}
        l={7}
        xl={7}
      >
        <FormTitle className={style.title}>
          {i18n._('OperationStatus.Loading.title')}
        </FormTitle>
        <p className={style.subtext}>
          {i18n._('OperationStatus.Loading.description')}
        </p>
      </Grid.Item>
    </Grid.Container>
  )
}

export default React.memo(Loading)
