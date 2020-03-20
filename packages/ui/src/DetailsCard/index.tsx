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
    <li className={style.item}>
      <h3 className={style.label}>
        {i18n._(label)}
      </h3>
      <p className={style.value}>
        {value}
      </p>
    </li>
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
  <ul className={cc([style.details, className])}>
    {
      itemList.map((item, index) =>
        <Item
          key={`${item.label}-${index}`}
          {...item}
        />
      )
    }
  </ul>
)

