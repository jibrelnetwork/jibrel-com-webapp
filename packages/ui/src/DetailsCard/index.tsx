import React from 'react'
import cc from 'classcat'
import { useI18n } from '@jibrelcom/i18n'

import style from './style.scss'
import { ItemProps } from './types'

const Item: React.FunctionComponent<ItemProps> = ({
  label,
  value
}) => {
  const i18n = useI18n()

  return (
    <div className={style.item}>
      <div className={style.label}>
        {i18n._(label)}
      </div>
      <div className={style.value}>
        {value}
      </div>
    </div>
  )
}

interface DetailsCard {
  className?: string;
  itemList: ItemProps[];
}

export const DetailsCard: React.FunctionComponent<DetailsCard> = ({
  itemList,
  className,
}) => (
  <div className={cc([style.details, className])}>
    {
      itemList.map((item, index) =>
        <Item
          key={`${item.label}-${index}`}
          {...item}
        />
      )
    }
  </div>
)

