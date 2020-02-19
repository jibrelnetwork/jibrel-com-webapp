import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'
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
  label: 'Portfolio.FundsCard.wireTransfer.label',
  title: 'Portfolio.FundsCard.wireTransfer.title',
}, {
  title: 'Portfolio.FundsCard.cryptoTransfer.title',
  isComing: true,
}, {
  title: 'Portfolio.FundsCard.bankCard.title',
  isComing: true,
}]

const Portfolio: React.FunctionComponent<PortfolioProps> = ({
  getInvestments,
  investments,
  isInvestmentsLoading,
}) => {
  useEffect(() => {
    getInvestments()

    return
  }, [])

  const i18n = useI18n()

  return (
    <CoreLayout>
      <PageTitle className={style.title}>
        {i18n._('Portfolio.title')}<InvestedAmount className={style.green} />
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
        {i18n._('Portfolio.balance')}<CurrentBalance className={style.green} />
      </PageTitle>
      <FormTitle>{i18n._('Portfolio.addFunds.title')}</FormTitle>
      <p className={style.description}>{i18n._('Portfolio.addFunds.description')}</p>
      <Grid.Container className={style.deposit}>
        {ADD_FUNDS.map(c => (
          <FundsCard
            key={i18n._(c.title)}
            label={c.label ? i18n._(c.label) : undefined}
            {...c}
          />
        ))}
      </Grid.Container>
      <FormTitle>{i18n._('Portfolio.withdraw.title')}</FormTitle>
      <Grid.Container className={style.withdraw}>
        <FundsCard
          label={i18n._('Portfolio.withdraw.card.label')}
          title={i18n._('Portfolio.withdraw.card.title')}
          isDisabled
        />
      </Grid.Container>
    </CoreLayout>
  )
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
