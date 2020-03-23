import React from 'react'
import { useStore } from 'effector-react'

import {
  PageTitle,
  PageBackLink,
} from '@jibrelcom/ui'
import {
  useI18n,
  useLanguageCode,
} from '@jibrelcom/i18n'

import { formatCurrency } from 'utils/formatters'

import { $Investment } from '../../model'

import style from './style.scss'

const Investment: React.FunctionComponent = () => {
  const i18n = useI18n()
  const languageCode = useLanguageCode()
  const investment = useStore($Investment)

  if (investment === null) {
    return null
  }

  const value = formatCurrency(
    parseInt(investment.amount.toString(), 10),
    languageCode,
    'USD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  )

  return (
    <section className={style.investment}>
      <PageTitle>
        {i18n._('ApplicationPayment.title', {
          startupName: investment.offering.security.company.name,
        })}
      </PageTitle>
      <PageBackLink
        className={style.back}
        route='Portfolio'
      >{i18n._('ApplicationPayment.back')}</PageBackLink>
      <div>
        <div className={style.amountTitle}>{i18n._('ApplicationPayment.Amount.title')}</div>
        <div className={style.amountValue}>{value}</div>
      </div>
    </section>
  )
}

export default Investment
