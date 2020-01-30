import React from 'react'
import cc from 'classcat'
import { Icon } from '@jibrelcom/ui'
import { useLanguageCode } from '@jibrelcom/i18n'

import COMPANIES_DATA from 'data/companiesData.json'

import {
  formatDate,
  formatAmount,
  formatCurrency,
  formatPercents,
} from 'utils/formatters'

import {
  Investment,
  InvestmentStatus,
} from 'store/types/portfolio'

import style from './style.scss'

const InvestmentCard: React.FunctionComponent<Investment> = ({
  offering,
  amount,
  status,
  createdAt,
}) => {
  const {
    price,
    security,
    shares: totalShares,
  } = offering

  const { name } = security.company
  const languageCode = useLanguageCode()
  const isPending: boolean = (status === InvestmentStatus.pending)
  const investedShares = parseFloat(amount) / parseFloat(price)

  const shares = formatAmount(
    Math.floor(investedShares),
    languageCode, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  )

  const ownership = formatPercents(
    investedShares / totalShares / 100,
    languageCode, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    },
  )

  const value = formatCurrency(
    parseInt(amount.toString(), 10),
    languageCode,
    'USD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  )

  const {
    logo,
    colorRGB,
  } = COMPANIES_DATA[name]

  return (
    <div
      className={style.main}
      style={{
        color: `rgb(${colorRGB})`,
        backgroundColor: `rgba(${colorRGB}, 0.1)`,
      }}
    >
      <img
        src={logo}
        className={style.logo}
      />
      <div className={style.name}>{name}</div>
      <div className={cc([style.amount, isPending && style.pending])}>
        <div className={style.value}>{value}</div>
        <div className={style.clock}>
          <Icon
            className={style.icon}
            namespace='investor'
            name='ic_trx_pending_32'
          />
          <div className={style.hint} />
        </div>
      </div>
      <div className={style.date}>{formatDate(createdAt)}</div>
      {!isPending && (
        <div className={style.info}>
          <div className={style.item}>
            <div className={style.label}>Number of Shares</div>
            <div className={style.value}>{shares}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>Ownership</div>
            <div className={style.value}>{ownership}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvestmentCard
