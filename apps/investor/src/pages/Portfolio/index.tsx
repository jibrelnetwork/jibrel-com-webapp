import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LoaderColor } from '@jibrelcom/ui/src/Loader/types'

import {
  Grid,
  Loader,
  FormTitle,
  PageTitle,
} from '@jibrelcom/ui'

import CoreLayout from 'layouts/CoreLayout'
import CurrentBalance from 'components/CurrentBalance'
import { Investment } from 'store/types/portfolio'

import {
  Dispatch,
  RootState,
} from 'store'

import style from './style.scss'
import FundsCard from './components/FundsCard'
import Investments from './components/Investments'
import InvestedAmount from './components/InvestedAmount'
import { FundsCardProps } from './components/FundsCard'

interface StateProps {
  investments: Investment[] | undefined;
  isInvestmentsLoading: boolean;
}

interface DispatchProps {
  getInvestments: () => void;
}

type PortfolioProps = StateProps & DispatchProps

const ADD_FUNDS: FundsCardProps[] = [{
  label: 'Deposit',
  title: 'Wire Transfer',
}, {
  title: 'Crypto Trasfer',
  isComing: true,
}, {
  title: 'Bank Card',
  isComing: true,
}]

class Portfolio extends Component<PortfolioProps> {
  componentDidMount(): void {
    this.props.getInvestments()
  }

  render(): React.ReactNode {
    const {
      investments,
      isInvestmentsLoading,
    }: PortfolioProps = this.props

    return (
      <CoreLayout>
        <PageTitle className={style.title}>
          My Portfolio<InvestedAmount className={style.green} />
        </PageTitle>
        <Grid.Container className={style.investments}>
          {(!investments || isInvestmentsLoading) ? (
            <Loader
              className={style.loader}
              color={LoaderColor.gray}
            />
          ) : <Investments items={investments} />}
        </Grid.Container>
        <PageTitle>
          Available Balance<CurrentBalance className={style.green} />
        </PageTitle>
        <FormTitle>Add Funds</FormTitle>
        <p className={style.description}>Top up your Jibrel account to invest into startups.</p>
        <Grid.Container className={style.deposit}>
          {ADD_FUNDS.map(c => <FundsCard key={c.title} {...c} />)}
        </Grid.Container>
        <FormTitle>Withdraw</FormTitle>
        <Grid.Container className={style.withdraw}>
          <FundsCard
            label='Withdraw'
            title='Wire Transfer'
            isDisabled
          />
        </Grid.Container>
      </CoreLayout>
    )
  }
}

export default connect<StateProps, DispatchProps>(
  (state: RootState) => {
    const {
      investments,
      isInvestmentsLoading,
    } = state.portfolio

    return {
      investments,
      isInvestmentsLoading,
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    getInvestments: dispatch.portfolio.getInvestments,
  })
)(Portfolio)
