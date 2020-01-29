import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LoaderColor } from '@jibrelcom/ui/src/Loader/types'

import {
  Loader,
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
import InvestedAmount from './components/InvestedAmount'
import InvestmentCard from './components/InvestmentCard'

interface StateProps {
  investments: Investment[] | undefined;
  isInvestmentsLoading: boolean;
}

interface DispatchProps {
  getInvestments: () => void;
}

type PortfolioProps = StateProps & DispatchProps

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
        <div className={style.content}>
          {(!investments || isInvestmentsLoading) ? (
            <Loader
              className={style.loader}
              color={LoaderColor.gray}
            />
          ) : investments.map(i => (
            <div key={i.offering.uuid} className={style.item}>
              <InvestmentCard {...i} />
            </div>
          ))}
        </div>
        <PageTitle>
          Available Balance<CurrentBalance className={style.green} />
        </PageTitle>
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
