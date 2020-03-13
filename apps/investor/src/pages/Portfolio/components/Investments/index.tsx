import React from 'react'
import cc from 'classcat'
import { Trans } from '@lingui/macro'
import { useI18n } from '@jibrelcom/i18n'
import groupBy from 'lodash-es/groupBy'

import {
  Loader,
  LoaderColor,
} from '@jibrelcom/ui'

import {
  Investment,
  InvestmentStatus,
  OfferingSubscription
} from 'store/types/portfolio'

import style from './style.scss'
import Waitlist from '../Waitlist'
import InvestmentCard from '../InvestmentCard'

export interface InvestmentsProps {
  investments: Investment[];
  waitlist?: OfferingSubscription[];
  isWaitlistLoading: boolean;
}

// status list
type GroupOrderStatus
  = InvestmentStatus.pending
  | InvestmentStatus.hold
  | InvestmentStatus.completed

// possible sort status enum
enum SortStatus {
  Desc = 1,
  Asc = -1,
  None = 0
}

type InvestmentsByGroup = {
  [status in GroupOrderStatus]?: Investment[]
}

const GROUP_TITLE: { [key in GroupOrderStatus]: string } = {
  pending: 'Portfolio.investments.pending.title',
  hold: 'Portfolio.investments.hold.title',
  completed: 'Portfolio.investments.completed.title',
}

const GROUP_ORDER: { [key in GroupOrderStatus]: number } = {
  pending: 1,
  hold: 2,
  completed: 3,
}

function sortStatuses(prev: GroupOrderStatus, next: GroupOrderStatus): SortStatus {
  if (GROUP_ORDER[prev] > GROUP_ORDER[next]) {
    return SortStatus.Desc
  } else if (GROUP_ORDER[prev] < GROUP_ORDER[next]) {
    return SortStatus.Asc
  }

  return SortStatus.None
}

const Investments: React.FunctionComponent<InvestmentsProps> = ({
  waitlist,
  investments,
  isWaitlistLoading,
}) => {
  const i18n = useI18n()
  const investmentsByGroup: InvestmentsByGroup = groupBy<Investment>(investments, 'status')

  return (
    <>
      {Object
        .keys(investmentsByGroup)
        .sort(sortStatuses)
        .map((status: InvestmentStatus) => {

        const isInvestmentVisible
          = status === 'hold'
          || status === 'completed'
          || status === 'pending'

        if (!isInvestmentVisible) {
          return null
        }

        const title = GROUP_TITLE[status as GroupOrderStatus]
        const list = investmentsByGroup[status as GroupOrderStatus] instanceof Array
          ? investmentsByGroup[status as GroupOrderStatus]
          : []
        const isPending = status === 'pending'

        if (list === undefined) {
          return null
        }

        return (
          <div key={status} className={style.main}>
            <div className={style.title}>
              <span>{i18n._(title)}</span>
              <span className={cc([style.count, isPending && style.pending])}>
                {list.length}
              </span>
            </div>
            {isPending && (
              <p className={style.description}>
                <Trans
                  components={[<br key='Portfolio.investments.pending.description' />]}
                  id='Portfolio.investments.pending.description'
                />
              </p>
            )}
            {list.map(i => <InvestmentCard key={i.uuid} id={i.uuid} {...i} />)}
          </div>
        )
      })}
      {isWaitlistLoading || waitlist === undefined ? (
        <Loader color={LoaderColor.gray} />
      ) : (
        <Waitlist items={waitlist} />
      )}
    </>
  )
}

export default Investments
