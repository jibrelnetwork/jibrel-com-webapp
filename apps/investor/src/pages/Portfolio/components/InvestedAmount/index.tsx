import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from '@jibrelcom/ui'
import { LanguageCode } from '@jibrelcom/i18n'
import { LoaderColor } from '@jibrelcom/ui/src/Loader/types'

import formatCurrency from 'utils/formatters/formatCurrency'

import {
  Dispatch,
  RootState,
} from 'store'

import style from './style.scss'

interface StateProps {
  lang: LanguageCode;
  investedAmount: string | undefined;
  isInvestedAmountLoading: boolean;
}

interface DispatchProps {
  getInvestedAmount: () => void;
}

interface OwnProps {
  className?: string;
}

type InvestedAmountProps = StateProps & DispatchProps & OwnProps

class InvestedAmount extends Component<InvestedAmountProps> {
  componentDidMount(): void {
    this.props.getInvestedAmount()
  }

  render(): React.ReactNode {
    const {
      lang,
      className,
      investedAmount,
      isInvestedAmountLoading,
    }: InvestedAmountProps = this.props

    if (!investedAmount || isInvestedAmountLoading) {
      return <Loader color={LoaderColor.gray} className={style.inline} />
    }

    const value = formatCurrency(
      parseFloat(investedAmount.toString()),
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
  (state: RootState) => {
    const {
      investedAmount,
      isInvestedAmountLoading,
    } = state.portfolio

    return {
      investedAmount,
      isInvestedAmountLoading,
      lang: state.user.languageCode,
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    getInvestedAmount: dispatch.portfolio.getInvestedAmount,
  })
)(InvestedAmount)
