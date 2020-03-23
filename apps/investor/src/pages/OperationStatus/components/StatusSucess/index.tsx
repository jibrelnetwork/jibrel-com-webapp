import React from 'react'
import { Link } from 'react-router5'
import isNil from 'lodash-es/isNil'
import {
  useI18n,
  useLanguageCode,
} from '@jibrelcom/i18n'
import {
  BigButton,
  BigButtonVariant,
  DetailsCard,
  FormTitle,
  Grid
} from '@jibrelcom/ui'

import settings from 'app/settings'

import { formatCurrency } from 'utils/formatters'

import { DepositOperation } from 'store/types/operations'
import { InvestApplication } from 'store/types/invest'

import style from '../../style.scss'

interface StatusSuccessProps {
  operation: DepositOperation;
  investment?: InvestApplication;
}

const StatusSuccess: React.FunctionComponent<StatusSuccessProps> = ({
  operation,
  investment,
}) => {
  const i18n = useI18n()
  const languageCode = useLanguageCode()

  const amount = formatCurrency(
    parseInt(operation.debitAmount.toString(), 10),
    languageCode,
    'USD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  )

  const investmentDetails = isNil(investment)
    ? []
    : [
      { label: 'OperationStatus.Success.Details.company.title', value: investment.offering.security.company.name },
    ]

  return (
    <Grid.Container
      component='article'
      className={style.statusContainer}
    >
      <Grid.Item
        className={`${style.headerImage} ${style.imageSuccess}`}
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
          <FormTitle className={`${style.title} ${style.titleSuccess}`}>
            {i18n._('OperationStatus.Success.title')}
          </FormTitle>
          <p className={style.subtext}>
            {i18n._('OperationStatus.Success.description')}
          </p>
          <DetailsCard itemList={[
            ...investmentDetails,
            { label: 'OperationStatus.Success.Details.amount.title', value: amount },
          ]} className={style.details} />
        </div>
        <Grid.Item
          className={style.actions}
          l={8}
          xl={8}
        >
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
        </Grid.Item>
      </Grid.Item>
    </Grid.Container>
  )
}

export default React.memo(StatusSuccess)
