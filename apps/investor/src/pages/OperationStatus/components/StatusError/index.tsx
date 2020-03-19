import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
import {
  BigButton,
  BigButtonVariant,
  FormTitle,
  Grid
} from '@jibrelcom/ui'

import style from '../../style.scss'

const StatusSuccess: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <Grid.Container
      component='article'
      className={style.statusContainer}
    >
      <Grid.Item
        className={`${style.headerImage} ${style.imageError}`}
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
          <FormTitle className={`${style.title} ${style.titleError}`}>
            {i18n._('OperationStatus.Error.title')}
          </FormTitle>
          <p className={style.subtext}>
            {i18n._('OperationStatus.Error.description')}
          </p>
        </div>
        <Grid.Item
          className={style.actions}
          l={8}
          xl={8}
        >
          <BigButton
            className={style.action}
            component='button'
            onClick={() => {
              alert('blablabla')
            }}
          >
            {i18n._('OperationStatus.actions.tryAgain')}
          </BigButton>
          <BigButton
            component='a'
            href='mailto:support@jibrel.com'
            target='_blank'
            variant={BigButtonVariant.secondary}
          >
            {i18n._('OperationStatus.actions.contactSupport')}
          </BigButton>
        </Grid.Item>
      </Grid.Item>
    </Grid.Container>
  )
}

export default React.memo(StatusSuccess)
