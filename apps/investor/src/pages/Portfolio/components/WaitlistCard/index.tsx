import React from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import { RootState } from 'store'

import {
  CompanyData,
  OfferingSubscription,
} from 'store/types/portfolio'

import style from '../InvestmentCard/style.scss'

interface StateProps {
  company: CompanyData | undefined;
}

type OwnProps = OfferingSubscription & {
  className?: string;
}

type WaitlistCardProps = StateProps & OwnProps

const WaitlistCard: React.FunctionComponent<WaitlistCardProps> = ({
  company,
  email,
}) => {
  if (!company) {
    return null
  }

  const {
    logo,
    color,
    title,
  } = company

  const i18n = useI18n()

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
        />
        <div className={cc([style.item, style.name])}>
          <div
            className={style.value}
            style={{ color: color.primary }}
          >
            {title}
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={cc([style.item, style.email])}>
          <div className={style.label}>
            {i18n._('Portfolio.investments.waitlist.emailForNotification')}
          </div>
          <div className={style.value}>
            {email}
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect<StateProps, null, OwnProps>(
  (state: RootState, ownProps: OwnProps) => {
    const { companies } = state.portfolio

    return {
      company: companies
        ? companies.find(({ title }) => (title === ownProps.offering.security.company.name))
        : undefined,
    }
  },
)(WaitlistCard)
