import React from 'react'
import { useI18n } from '@jibrelcom/i18n'

import {
  FormTitle,
  Grid,
  Loader,
} from '@jibrelcom/ui'

import {
  Investment,
  OfferingSubscription,
} from 'store/types/portfolio'

import Investments from '../Investments'
import Empty from '../Empty'
import style from '../../style.scss'

interface InvestmentsListProps {
  investments?: Investment[];
  waitlist?: OfferingSubscription[];
  isWaitlistLoading: boolean;
}

type InvestmentsBodyProps = InvestmentsListProps & {
  isLoading: boolean;
}

const InvestmentsList: React.FC<InvestmentsListProps> = ({
  waitlist,
  investments,
  ...otherProps
}) => (!investments?.length && !waitlist?.length) ? <Empty /> : <Investments
  waitlist={waitlist}
  investments={investments}
  {...otherProps}
/>

const InvestmentsBody: React.FC<InvestmentsBodyProps> = ({
  isLoading,
  ...otherProps
}) => {
  const i18n = useI18n()

  return (
    <Grid.Container className={style.investments}>
      <Grid.Item component={FormTitle}>
        {i18n._('Portfolio.investments.title')}
      </Grid.Item>
      {isLoading ? (
        <Grid.Item
          component={Loader}
          className={style.loader}
          color={Loader.color.Gray}
        />
      ) : (
        <Grid.Item>
          <InvestmentsList {...otherProps} />
        </Grid.Item>
      )}
    </Grid.Container>
  )
}

export default InvestmentsBody
