import React from 'react'
import { useI18n } from '@jibrelcom/i18n'

import { OfferingSubscription } from 'store/types/portfolio'

import WaitlistCard from '../WaitlistCard'
import style from '../Investments/style.scss'

export interface WaitlistProps {
  items: OfferingSubscription[];
}

const Waitlist: React.FunctionComponent<WaitlistProps> = ({ items }) => {
  if (items.length === 0) {
    return null
  }

  const i18n = useI18n()

  return (
    <div key={status} className={style.main}>
      <div className={style.title}>
        <span>
          {i18n._('Portfolio.investments.waitlist.title')}
        </span>
        <span className={style.count}>
          {items.length}
        </span>
      </div>
      <p className={style.description}>
        {i18n._('Portfolio.investments.waitlist.description')}
      </p>
      {items.map(i => <WaitlistCard key={i.offering.uuid} {...i} />)}
    </div>
  )
}

export default Waitlist
