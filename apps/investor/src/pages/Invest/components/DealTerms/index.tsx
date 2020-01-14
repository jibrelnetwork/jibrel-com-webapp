import React, { Component } from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { LanguageCode } from '@jibrelcom/i18n'

import { DealTermsData } from 'store/types/invest'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  Loader,
  LoaderColor,
} from '@jibrelcom/ui'

import {
  formatDate,
  formatCurrency,
} from 'utils/formatters'

import style from './style.scss'

export interface DealTermsProps {
  getDealTerms: (id: string) => void;
  dealTermsData: DealTermsData;
  slug: string;
  languageCode: LanguageCode;
  isDealTermsLoading: boolean;
}

function formatAmount(
  amount: number,
  languageCode: LanguageCode,
): string {
  return formatCurrency(
    amount,
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
      getDealTerms,
      slug,
    }: DealTermsProps = this.props

    getDealTerms(slug)
  }

  render(): React.ReactNode {
    const {
      dealTermsData,
      languageCode,
      isDealTermsLoading,
    }: DealTermsProps = this.props

    const data = !dealTermsData ? undefined : [{
      key: 'Valuation',
      value: formatAmount(dealTermsData.valuation, languageCode),
    }, {
      key: 'Type of Security',
      value: dealTermsData.typeOfSecurity,
    }, {
      key: 'Offered Equity',
      value: `${dealTermsData.offeredEquity}%`,
    }, {
      key: 'Funding Round',
      value: dealTermsData.fundingRound,
    }, {
      key: 'Round Size',
      value: formatAmount(dealTermsData.roundSize, languageCode),
    }, {
      key: 'Deadline',
      value: formatDate(dealTermsData.deadline),
    }]

    return (
      <>
        <h2 className={style.title}>Deal Terms</h2>
        <div className={cc([style.data, isDealTermsLoading && style.loading])}>
          {!data || isDealTermsLoading ? <Loader color={LoaderColor.gray} /> : data.map(item => (
            <div className={style.item} key={item.key}>
              <div className={style.label}>{item.key}</div>
              <div className={style.value}>{item.value}</div>
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
    dealTermsData: state.invest.dealTermsData,
    isDealTermsLoading: state.invest.isDealTermsLoading,
  }),
  (dispatch: Dispatch) => ({
    getDealTerms: dispatch.invest.getDealTerms,
  })
)(DealTerms)
