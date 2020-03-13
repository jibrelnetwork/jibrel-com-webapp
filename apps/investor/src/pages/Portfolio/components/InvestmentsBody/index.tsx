import React from 'react'

import { useI18n } from '@jibrelcom/i18n'
import {
  FormTitle,
  Grid,
  Loader,
} from '@jibrelcom/ui'

import {
  Investment,
  OfferingSubscription
} from 'store/types/portfolio'

import Investments from '../Investments'
import Empty from '../Empty'

import style from '../../style.scss'

interface BodyProps {
  isWaitlistLoading: boolean;
  investments?: Investment[];
  waitlist?: OfferingSubscription[];
}

interface InvestmentsBodyProps {
  isLoading: boolean;
}

const Body: React.FC<BodyProps> = ({
  isWaitlistLoading,
  waitlist,
  investments
}) => investments !== undefined && investments.length > 0
  ? <Grid.Item>
      <Investments
        waitlist={waitlist}
        investments={investments}
        isWaitlistLoading={isWaitlistLoading}
      />
    </Grid.Item>
  : <Empty />


const InvestmentsBody: React.FC<InvestmentsBodyProps & BodyProps> = ({
  isLoading,
  isWaitlistLoading,
  waitlist,
  investments
}) => {
  const i18n = useI18n()
  const bodyProps = {
    isWaitlistLoading,
    waitlist,
    investments
  }

  return (
    <Grid.Container className={style.investments}>
      <Grid.Item component={FormTitle}>
        {i18n._('Portfolio.investments.title')}
      </Grid.Item>
      {isLoading
        ? <Grid.Item
          component={Loader}
          className={style.loader}
          color={Loader.color.Gray}
        />
        : <Body {...bodyProps} />
      }
    </Grid.Container>
  )
}

export default InvestmentsBody
