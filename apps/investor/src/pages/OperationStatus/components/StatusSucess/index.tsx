import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
import {
  BigButton,
  BigButtonVariant,
  FormTitle,
  Grid
} from '@jibrelcom/ui'

import statusImage from '../../../../public/images/pic_status_circle@2x.png'

import style from './style.scss'

const StatusSuccess: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <Grid.Container
      component='article'
      className={style.statusContainer}
    >
      <Grid.Item
        component='img'
        className={style.headerImage}
        src={statusImage}
        alt=''
        aria-disabled
        s={4}
        m={4}
        l={6}
        xl={6}
      />
      <Grid.Item
        s={4}
        m={4}
        l={6}
        xl={6}
      >
        <div
          className={style.body}
        >
          <FormTitle className={style.successTitle}>
            {i18n._('OperationStatus.Success.title')}
          </FormTitle>
          <p className={style.subtext}>
            {i18n._('OperationStatus.Success.description')}
          </p>
        </div>
        <div className={style.actions}>
          <BigButton
            className={style.action}
            component='a'
            href='/'
          >
            {i18n._('OperationStatus.actions.toPortfolio')}
          </BigButton>
          <BigButton
            component='a'
            href='/'
            variant={BigButtonVariant.secondary}
          >
            {i18n._('OperationStatus.actions.backToMain')}
          </BigButton>
        </div>
      </Grid.Item>
    </Grid.Container>
  )
}

export default React.memo(StatusSuccess)
