import React from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'

import {
  useI18n,
  LanguageCode,
} from '@jibrelcom/i18n'

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
  [SecurityType.common_shares]: 'Invest.DealTerms.securityType.commonShares',
  [SecurityType.convertible_debt]: 'Invest.DealTerms.securityType.convertibleDebt',
}

const FUNDING_ROUND_MAP = {
  [FundingRound.angel]: 'Invest.DealTerms.fundingRound.angel',
  [FundingRound.seed]: 'Invest.DealTerms.fundingRound.seed',
  [FundingRound.a]: 'Invest.DealTerms.fundingRound.a',
  [FundingRound.b]: 'Invest.DealTerms.fundingRound.b',
  [FundingRound.c]: 'Invest.DealTerms.fundingRound.c',
  [FundingRound.d]: 'Invest.DealTerms.fundingRound.d',
}

function checkTypeIsShares(type: SecurityType): boolean {
  return (type === SecurityType.common_shares)
}

const DealTerms: React.FunctionComponent<DealTermsProps> = ({
  offeringData,
  languageCode,
  isOfferingDataLoading,
}) => {
  const i18n = useI18n()

  const data = !offeringData ? undefined : [{
    key: checkTypeIsShares(offeringData.security.type)
      ? i18n._('Invest.DealTerms.valuation')
      : i18n._('Invest.DealTerms.valuationCap'),
    value: formatAmount(offeringData.valuation, languageCode),
  }, {
    key: i18n._('Invest.DealTerms.typeOfSecurity'),
    value: i18n._(SECURITY_TYPE_MAP[offeringData.security.type]),
  }, {
    key: i18n._('Invest.DealTerms.fundingRound'),
    value: i18n._(FUNDING_ROUND_MAP[offeringData.round]),
  }, {
    key: i18n._('Invest.DealTerms.roundSize'),
    value: formatAmount(offeringData.goal, languageCode),
  }]

  return (
    <>
      <FormTitle>{i18n._('Invest.DealTerms.title')}</FormTitle>
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
