import React from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { LanguageCode } from '@jibrelcom/i18n'

import {
  Loader,
  FormTitle,
  LoaderColor,
} from '@jibrelcom/ui'

import { RootState } from 'store'

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

function checkTypeIsShares(type: SecurityType): boolean {
  return (type === SecurityType.common_shares)
}

const DealTerms: React.FunctionComponent<DealTermsProps> = ({
  offeringData,
  languageCode,
  isOfferingDataLoading,
}) => {
  const data = !offeringData ? undefined : [{
    key: checkTypeIsShares(offeringData.security.type) ? 'Valuation' : 'Valuation Cap',
    value: formatAmount(offeringData.valuation, languageCode),
  }, {
    key: 'Type of Security',
    value: SECURITY_TYPE_MAP[offeringData.security.type],
  }, {
    key: 'Funding Round',
    value: FUNDING_ROUND_MAP[offeringData.round],
  }, {
    key: 'Round Size',
    value: formatAmount(offeringData.goal, languageCode),
  }]

  return (
    <>
      <FormTitle>Deal Terms</FormTitle>
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
