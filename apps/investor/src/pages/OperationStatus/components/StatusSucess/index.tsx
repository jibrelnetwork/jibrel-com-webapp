import React from 'react'
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

import { formatCurrency } from 'utils/formatters'

import { DepositOperation } from 'store/types/operations'

import style from '../../style.scss'

interface StatusSuccessProps {
  operation: DepositOperation;
}

const StatusSuccess: React.FunctionComponent<StatusSuccessProps> = ({
  operation,
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
        </Grid.Item>
      </Grid.Item>
    </Grid.Container>
  )
}

export default React.memo(StatusSuccess)
