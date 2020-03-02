import React, { useEffect } from 'react'
import { Link } from 'react-router5'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import {
  Grid,
  Loader,
  FormTitle,
  PageTitle,
  SmallButton,
  LoaderColor,
} from '@jibrelcom/ui'

import CoreLayout from 'layouts/CoreLayout'
import CurrentBalance from 'components/CurrentBalance'
import { Offering } from 'store/types/invest'

import {
  Investment,
  CompanyData,
  OfferingSubscription,
} from 'store/types/portfolio'

import {
  Dispatch,
  RootState,
} from 'store'

import style from './style.scss'
import Companies from './components/Companies'
import Investments from './components/Investments'
import InvestedAmount from './components/InvestedAmount'

interface StateProps {
  companies: CompanyData[] | undefined;
  investments: Investment[] | undefined;
  waitlist: OfferingSubscription[] | undefined;
  isLoading: boolean;
  isWaitlistLoading: boolean;
}

interface DispatchProps {
  getWaitlist: () => void;
  getCompanies: () => void;
  getInvestments: () => void;
}

type PortfolioProps = StateProps & DispatchProps

function checkSlugEqual(offering: Offering, slug: string): boolean {
  return slug === offering.security.company.slug
}

function getMoreOpportunities(
  companies: CompanyData[] | undefined,
  investments: Investment[] | undefined,
  waitlist: OfferingSubscription[] | undefined,
): CompanyData[] {
  if (!companies) {
    return []
  }

  return companies.filter((company: CompanyData) => {
    const {
      slug,
      currentOffering,
    } = company

    if (!currentOffering) {
      return false
    } else if (currentOffering.flags.completed) {
      return false
    }

    const isSubscriptionFound = !!(waitlist || []).find(i => checkSlugEqual(i.offering, slug))
    const isInvestmentFound = !!(investments || []).find(i => checkSlugEqual(i.offering, slug))

    return !(isInvestmentFound || isSubscriptionFound)
  })
}

const Portfolio: React.FunctionComponent<PortfolioProps> = ({
  getWaitlist,
  getCompanies,
  getInvestments,
  waitlist,
  companies,
  investments,
  isLoading,
  isWaitlistLoading,
}) => {
  useEffect(() => {
    getWaitlist()
    getCompanies()
    getInvestments()
  }, [])

  const i18n = useI18n()
  const moreOpportunities = getMoreOpportunities(companies, investments, waitlist)

  console.log('style.investedLoader', style.investedLoader)

  return (
    <CoreLayout>
      <Grid.Container>
        <Grid.Item
          xs={4}
          s={4}
          m={4}
          l={6}
          xl={7}
        >
          <PageTitle className={style.title}>
            {i18n._('Portfolio.title')}
          </PageTitle>
          <h2 className={style.subtitle}>
            {i18n._('Portfolio.totalInvested')}
            <InvestedAmount
              className={style.green}
              loaderClassName={style.investedLoader}
            />
          </h2>
          <div className={style.note}>
            {i18n._('Portfolio.totalInvestedNote')}
          </div>
        </Grid.Item>
        <Grid.Item
          xs={4}
          s={4}
          m={4}
          l={6}
          xl={5}
        >
          <div className={style.border}>
            <h3 className={style.balance}>
              {i18n._('Portfolio.balance')}
            </h3>
            <div className={style.available}>
              <CurrentBalance
                loaderColor={LoaderColor.gray}
                className={`${style.subtitle} ${style.current}`}
              />
            </div>
            <div className={style.buttons}>
              <Link routeName='Unverified'>
                <SmallButton component='button'>
                  {i18n._('Portfolio.actions.deposit')}
                </SmallButton>
              </Link>
              <div className={style.withdraw}>
                <SmallButton
                  component='button'
                  isDisabled
                >
                  {i18n._('Portfolio.actions.withdraw')}
                </SmallButton>
              </div>
            </div>
          </div>
        </Grid.Item>
      </Grid.Container>
      <Grid.Container className={style.investments}>
        <Grid.Item component={FormTitle}>
          {i18n._('Portfolio.investments.title')}
        </Grid.Item>
        {(isLoading || !investments) ? (
          <Loader
            className={style.loader}
            color={LoaderColor.gray}
          />
        ) : (
          <Investments
            waitlist={waitlist}
            investments={investments}
            isWaitlistLoading={isWaitlistLoading}
          />
        )}
      </Grid.Container>
      {moreOpportunities && moreOpportunities.length && (
        <Grid.Container className={style.opportunities}>
          <Grid.Item
            component={PageTitle}
            className={style.title}
          >
            {i18n._('Portfolio.companies.title')}
          </Grid.Item>
          <Grid.Item>
            <Companies list={moreOpportunities} />
          </Grid.Item>
        </Grid.Container>
      )}
    </CoreLayout>
  )
}

export default connect<StateProps, DispatchProps>(
  (state: RootState) => {
    const {
      waitlist,
      companies,
      investments,
      isWaitlistLoading,
      isCompaniesLoading,
      isInvestmentsLoading,
    } = state.portfolio

    return {
      waitlist,
      companies,
      investments,
      isWaitlistLoading,
      isLoading: isCompaniesLoading || isInvestmentsLoading,
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    getWaitlist: dispatch.portfolio.getWaitlist,
    getCompanies: dispatch.portfolio.getCompanies,
    getInvestments: dispatch.portfolio.getInvestments,
  })
)(Portfolio)
