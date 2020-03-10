import React from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'

import {
  useI18n,
  LanguageCode,
} from '@jibrelcom/i18n'

import {
  SmallButton,
  SmallButtonVariant,
} from '@jibrelcom/ui'

import { RootState } from 'store'

import {
  formatDate,
  formatCurrency,
} from 'utils/formatters'

import {
  Investment,
  CompanyData,
  InvestmentStatus,
} from 'store/types/portfolio'

import style from './style.scss'

interface StateProps {
  company?: CompanyData;
  languageCode: LanguageCode;
}

type OwnProps = Investment & {
  className?: string;
}

type InvestmentCardProps = StateProps & OwnProps

const InvestmentCard: React.FunctionComponent<InvestmentCardProps> = ({
  company,
  amount,
  status,
  updatedAt,
  languageCode,
}) => {
  if (!company) {
    return null
  }

  const i18n = useI18n()
  const isVerifying = (status === InvestmentStatus.hold)
  const isPending = (status === InvestmentStatus.pending)

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
    title,
  } = company

  // FIXME should use RouterLink by name
  return (
    <div
      className={style.main}
      style={{
        color: color.primary,
        backgroundColor: color.background,
      }}
    >
      <div className={style.left}>
        <img
          src={logo}
          className={style.logo}
          alt=''
          aria-disabled
        />
        <div className={cc([style.item, style.name])}>
          {isVerifying && (
            <div className={style.label}>
              {i18n._('Portfolio.investments.card.verifying')}
            </div>
          )}
          <div
            className={style.value}
            style={{ color: color.primary }}
          >
            {title}
          </div>
        </div>
      </div>
      <div className={style.right}>
      <div className={cc([style.item, style.amount])}>
        <div className={style.label}>
            {isPending
              ? i18n._('Portfolio.investments.card.paymentAmount')
              : i18n._('Portfolio.investments.card.amount')
            }
          </div>
          <div className={style.value}>
            {value}
          </div>
        </div>
        {isPending ? (
          <SmallButton
            className={style.pay}
            variant={SmallButtonVariant.secondary}
            href='/application/:id/pay'
            component='a'
          >
            {i18n._('Portfolio.investments.card.action.pay')}
          </SmallButton>
        ) : (
          <div className={cc([style.item, style.date])}>
            <div className={style.label}>
              {i18n._('Portfolio.investments.card.dateOfInvestment')}
            </div>
            <div className={style.value}>
              {formatDate(updatedAt, languageCode, { month: 'short' })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default connect<StateProps, null, OwnProps>(
  (state: RootState, ownProps: OwnProps) => {
    const { companies } = state.portfolio

    const company = companies?.find(
      ({ title }) =>
        title === ownProps.offering.security.company.name
    )

    return {
      company,
      languageCode: state.user.languageCode,
    }
  },
)(InvestmentCard)
