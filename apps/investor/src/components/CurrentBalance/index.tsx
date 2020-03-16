import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { LanguageCode } from '@jibrelcom/i18n'

import {
  Loader,
  LoaderColor,
} from '@jibrelcom/ui'

import formatCurrency from 'utils/formatters/formatCurrency'

import {
  Dispatch,
  RootState,
} from 'store'

interface StateProps {
  balance: string | undefined;
  lang: LanguageCode;
  isBalanceLoading: boolean;
}

interface DispatchProps {
  getBalance: () => void;
}

interface OwnProps {
  className?: string;
  loaderColor?: LoaderColor;
}

type CurrentBalanceProps = StateProps & DispatchProps & OwnProps

const CurrentBalance: React.FunctionComponent<CurrentBalanceProps> = ({
  getBalance,
  lang,
  balance,
  className,
  loaderColor,
  isBalanceLoading,
}) => {
  useEffect(() => {
    getBalance()
  }, [])

  if (!balance || isBalanceLoading) {
    return <Loader color={loaderColor} />
  }

  const value = formatCurrency(
    parseFloat(balance.toString()),
    lang,
    'USD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  )

  return <span className={className}>{value}</span>
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState): StateProps => ({
    ...state.payments,
    lang: state.user.languageCode,
  }),
  (dispatch: Dispatch): DispatchProps => ({
    getBalance: dispatch.payments.getBalance,
  })
)(CurrentBalance)