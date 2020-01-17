import React, { Component } from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { LanguageCode } from '@jibrelcom/i18n'

import {
  Loader,
  LoaderColor,
} from '@jibrelcom/ui'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  formatDate,
  formatCurrency,
} from 'utils/formatters'

import {
  OfferingData,
  FundingRound,
  SecurityType,
} from 'store/types/invest'

import style from './style.scss'
import investStyle from '../../style.scss'

export interface DealTermsProps {
  getOfferingData: (id: string) => void;
  offeringData: OfferingData;
  slug: string;
  languageCode: LanguageCode;
  isDealTermsLoading: boolean;
}

const SECURITY_TYPE_MAP = {
  [SecurityType.common_shares]: 'Common Shares',
  [SecurityType.convertible_debt]: 'Convertible Promissory Note',
}

const FUNDING_ROUND_MAP = {
  [FundingRound.angel]: 'Angel Round',
  [FundingRound.seed]: 'Seed Round',
  [FundingRound.a]: 'Series A',
  [FundingRound.b]: 'Series B',
  [FundingRound.c]: 'Series C',
  [FundingRound.d]: 'Series D',
}

function formatAmount(
  amount: string | number,
  languageCode: LanguageCode,
): string {
  return formatCurrency(
    parseInt(amount.toString(), 10),
    languageCode,
    'USD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  )
}

class DealTerms extends Component<DealTermsProps> {
  componentDidMount(): void {
    const {
      getOfferingData,
      slug,
    }: DealTermsProps = this.props

    getOfferingData(slug)
  }

  render(): React.ReactNode {
    const {
      offeringData,
      languageCode,
      isDealTermsLoading,
    }: DealTermsProps = this.props

    const data = !offeringData ? undefined : [{
      key: 'Valuation',
      value: formatAmount(offeringData.valuation, languageCode),
    }, {
      key: 'Type of Security',
      value: SECURITY_TYPE_MAP[offeringData.security.type],
    }, {
      key: 'Offered Equity',
      value: `${offeringData.equity}%`,
    }, {
      key: 'Funding Round',
      value: FUNDING_ROUND_MAP[offeringData.round],
    }, {
      key: 'Round Size',
      value: formatAmount(offeringData.goal, languageCode),
    }, {
      key: 'Deadline',
      value: formatDate(offeringData.dateEnd),
    }]

    return (
      <>
        <h2 className={investStyle.subtitle}>Deal Terms</h2>
        <div className={cc([style.data, isDealTermsLoading && style.loading])}>
          {!data || isDealTermsLoading ? <Loader color={LoaderColor.gray} /> : data.map(item => (
            <div className={style.item} key={item.key}>
              <div className={investStyle.label}>{item.key}</div>
              <div className={investStyle.value}>{item.value}</div>
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default connect(
  (state: RootState) => ({
    languageCode: state.user.languageCode,
    offeringData: state.invest.offeringData,
    isOfferingDataLoading: state.invest.isOfferingDataLoading,
  }),
  (dispatch: Dispatch) => ({
    getOfferingData: dispatch.invest.getOfferingData,
  })
)(DealTerms)
