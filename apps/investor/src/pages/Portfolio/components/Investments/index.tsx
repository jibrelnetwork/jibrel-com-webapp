import React from 'react'
import cc from 'classcat'
import { Trans } from '@lingui/macro'
import { useI18n } from '@jibrelcom/i18n'

import {
  Loader,
  LoaderColor,
} from '@jibrelcom/ui'

import {
  Investment,
  InvestmentStatus,
  OfferingSubscription,
} from 'store/types/portfolio'

import Empty from '../Empty'
import style from './style.scss'
import Waitlist from '../Waitlist'
import InvestmentCard from '../InvestmentCard'

export interface InvestmentsProps {
  investments: Investment[];
  waitlist: OfferingSubscription[] | undefined;
  isWaitlistLoading: boolean;
}

type InvestmentsByGroup = { [status: string]: Investment[] }

const GROUP_TITLE: { [key: string]: string | undefined } = {
  pending: 'Portfolio.investments.pending.title',
  hold: 'Portfolio.investments.hold.title',
  completed: 'Portfolio.investments.completed.title',
}

const GROUP_ORDER: { [key: string]: number } = {
  pending: 1,
  hold: 2,
  completed: 3,
}

function splitInvestmentsByGroup(list: Investment[]): InvestmentsByGroup {
  return list.reduce((
    result: InvestmentsByGroup,
    current: Investment,
  ): InvestmentsByGroup => {
    return {
      ...result,
      [InvestmentStatus[current.status]]: [
        ...(result[current.status] || []),
        current,
      ]
    }
  }, {})
}

function sortStatuses(prev: string, next: string): number {
  if (GROUP_ORDER[prev] > GROUP_ORDER[next]) {
    return 1
  } else if (GROUP_ORDER[prev] < GROUP_ORDER[next]) {
    return -1
  }

  return 0
}

const Investments: React.FunctionComponent<InvestmentsProps> = ({
  waitlist,
  investments,
  isWaitlistLoading,
}) => {
  if (!investments.length) {
    return <Empty />
  }

  const i18n = useI18n()
  const investmentsByGroup = splitInvestmentsByGroup(investments)

  return (
    <>
      {Object.keys(investmentsByGroup).sort(sortStatuses).map((status) => {
        const title = GROUP_TITLE[status]

        if (!title) {
          return null
        }

        const list = investmentsByGroup[status]
        const isPending = (status === 'pending')

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
            {list.map(i => <InvestmentCard key={i.offering.uuid} {...i} />)}
          </div>
        )
      })}
      {isWaitlistLoading || !waitlist ? (
        <Loader color={LoaderColor.gray} />
      ) : (
        <Waitlist items={waitlist} />
      )}
    </>
  )
}

export default Investments
