import React, { Component } from 'react'
import cc from 'classcat'
import { Icon } from '@jibrelcom/ui'
import { connect } from 'react-redux'
import { LanguageCode } from '@jibrelcom/i18n'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  formatDate,
  formatAmount,
  formatCurrency,
  formatPercents,
} from 'utils/formatters'

import {
  Companies,
  Investment,
  InvestmentStatus,
} from 'store/types/portfolio'

import style from './style.scss'

interface StateProps {
  companies: Companies;
  languageCode: LanguageCode;
}

interface DispatchProps {
  getCompanyData: (slug: string) => void;
}

interface OwnProps {
  className?: string;
}

type InvestmentCardProps = StateProps & DispatchProps & Investment

class InvestmentCard extends Component<InvestmentCardProps> {
  componentDidMount(): void {
    const {
      getCompanyData,
      offering: { security },
    } = this.props

    getCompanyData(security.company.name.toLowerCase().replace(' ', ''))
  }

  render(): React.ReactNode {
    const {
      offering,
      companies,
      amount,
      status,
      createdAt,
      languageCode,
    } = this.props

    const {
      price,
      security,
      shares: totalShares,
    } = offering

    const { name } = security.company
    const companyData = companies[name.toLowerCase().replace(' ', '')]

    if (!companyData) {
      return null
    }

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
      color,
    } = companyData

    return (
      <div
        className={style.main}
        style={{
          color: color.primary,
          backgroundColor: color.background,
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
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    companies: state.portfolio.companies,
    languageCode: state.user.languageCode,
  }),
  (dispatch: Dispatch) => ({
    getCompanyData: dispatch.portfolio.getCompanyData,
  })
)(InvestmentCard)
