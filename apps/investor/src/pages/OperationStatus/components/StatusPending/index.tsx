import React from 'react'
import { Link } from 'react-router5'
import { useI18n } from '@jibrelcom/i18n'
import {
  BigButton,
  BigButtonVariant,
  FormTitle,
  Grid
} from '@jibrelcom/ui'

import settings from 'app/settings'

import style from '../../style.scss'

const StatusPending: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <Grid.Container
      component='article'
      className={style.statusContainer}
    >
      <Grid.Item
        className={`${style.headerImage} ${style.imagePending}`}
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
          <FormTitle className={`${style.title} ${style.titlePending}`}>
            {i18n._('OperationStatus.Pending.title')}
          </FormTitle>
          <p className={style.subtext}>
            {i18n._('OperationStatus.Pending.description')}
          </p>
        </div>
        <div className={style.actions}>
          <BigButton
            className={style.action}
            component={Link}
            routeName='Portfolio'
          >
            {i18n._('OperationStatus.actions.toPortfolio')}
          </BigButton>
          <BigButton
            component='a'
            href={`${settings.CMS_ORIGIN}/`}
            variant={BigButtonVariant.secondary}
          >
            {i18n._('OperationStatus.actions.backToMain')}
          </BigButton>
        </div>
      </Grid.Item>
    </Grid.Container>
  )
}

export default React.memo(StatusPending)
