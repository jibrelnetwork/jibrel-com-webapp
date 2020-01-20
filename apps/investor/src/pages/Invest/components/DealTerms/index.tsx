import React from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { LanguageCode } from '@jibrelcom/i18n'

import {
  Loader,
  LoaderColor,
} from '@jibrelcom/ui'

import { RootState } from 'store'
import { formatDate } from 'utils/formatters'

import {
  Offering,
  FundingRound,
  SecurityType,
} from 'store/types/invest'

import style from './style.scss'
import investStyle from '../../style.scss'
import formatAmount from '../../utils/formatAmount'

interface OwnProps {
  slug: string;
}

interface StateProps {
  offeringData: Offering | void;
  languageCode: LanguageCode;
  isOfferingDataLoading: boolean;
}

export type DealTermsProps = StateProps & OwnProps

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

const DealTerms: React.FunctionComponent<DealTermsProps> = ({
  offeringData,
  languageCode,
  isOfferingDataLoading,
}) => {
  const data = !offeringData ? undefined : [{
    key: 'Valuation',
    value: formatAmount(offeringData.valuation, languageCode),
  }, {
    key: 'Type of Security',
    value: SECURITY_TYPE_MAP[offeringData.security.type],
  }, {
    key: 'Offered Equity',
    value: `${offeringData.equity.split('.')[0]}%`,
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
      <div className={cc([style.data, isOfferingDataLoading && style.loading])}>
        {!data || isOfferingDataLoading ? <Loader color={LoaderColor.gray} /> : data.map(item => (
          <div className={style.item} key={item.key}>
            <div className={investStyle.label}>{item.key}</div>
            <div className={investStyle.value}>{item.value}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default connect<StateProps, void, OwnProps>(
  (state: RootState): StateProps => ({
    languageCode: state.user.languageCode,
    offeringData: state.invest.offeringData,
    isOfferingDataLoading: state.invest.isOfferingDataLoading,
  })
)(DealTerms)
