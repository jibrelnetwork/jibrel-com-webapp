import React from 'react' 
import { Grid } from '@jibrelcom/ui'

import { Investment } from 'store/types/portfolio'

import Empty from '../Empty'
import style from '../../style.scss'
import InvestmentCard from '../InvestmentCard'

export interface InvestmentsProps {
  items: Investment[];
}

const Investments: React.FunctionComponent<InvestmentsProps> = ({
  items,
}) => {
  if (!items.length) {
    return <Empty />
  }
  
  return (
    <>
      {items.map(i => (
        <Grid.Item key={i.offering.uuid} className={style.item}>
          <InvestmentCard {...i} />
        </Grid.Item>
      ))}
    </>
  )
}

export default Investments
