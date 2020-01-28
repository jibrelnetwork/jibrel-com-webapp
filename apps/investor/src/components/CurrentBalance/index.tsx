import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from '@jibrelcom/ui'
import { LanguageCode } from '@jibrelcom/i18n'

import formatCurrency from 'utils/formatters/formatCurrency'

import {
  Dispatch,
  RootState,
} from 'store'

interface StateProps {
  balance: string;
  lang: LanguageCode;
  isBalanceLoading: boolean;
}

interface DispatchProps {
  getBalance: () => void;
}

interface OwnProps {
  className?: string;
}

type CurrentBalanceProps = StateProps & DispatchProps & OwnProps

class CurrentBalance extends Component<CurrentBalanceProps> {
  componentDidMount(): void {
    this.props.getBalance()
  }

  render(): React.ReactNode {
    const {
      lang,
      balance,
      className,
      isBalanceLoading,
    }: CurrentBalanceProps = this.props

    if (!balance || isBalanceLoading) {
      return <Loader />
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