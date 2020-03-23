import React from 'react'
import isNil from 'lodash-es/isNil'
import { Link } from 'react-router5'
import { useI18n } from '@jibrelcom/i18n'
import {
  BigButton,
  BigButtonVariant,
  FormTitle,
  Grid
} from '@jibrelcom/ui'

import style from '../../style.scss'

import { InvestApplication } from 'store/types/invest'

interface StatusErrorProps {
  investment?: InvestApplication;
}

const StatusError: React.FunctionComponent<StatusErrorProps> = ({
  investment,
}) => {
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
        <div className={style.actions}>
          {!isNil(investment) && (
            <BigButton
              className={style.action}
              component={Link}
              routeName='ApplicationPayment'
              routeParams={{
                id: investment.uuid
              }}
            >
              {i18n._('OperationStatus.actions.tryAgain')}
            </BigButton>
          )}
          <BigButton
            component='a'
            href='mailto:support@jibrel.com'
            target='_blank'
            variant={BigButtonVariant.secondary}
          >
            {i18n._('OperationStatus.actions.contactSupport')}
          </BigButton>
        </div>
      </Grid.Item>
    </Grid.Container>
  )
}

export default React.memo(StatusError)
