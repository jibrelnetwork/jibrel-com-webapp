import React from 'react'
import cc from 'classcat'
import { Link } from 'react-router5'

import {
  Grid,
  Icon,
  SmallButton,
} from '@jibrelcom/ui'

import style from './style.scss'
import { item } from '../../style.scss'

export interface FundsCardProps {
  title: string;
  label?: string;
  routeName?: string;
  isComing?: boolean;
  isDisabled?: boolean;
}

const Button: React.FunctionComponent<FundsCardProps> = ({
  label = undefined,
  isComing,
  isDisabled,
}) => (
  <SmallButton
    className={style.button}
    isDisabled={isDisabled}
  >
    {(isComing || !label) ? 'coming soon' : label}
  </SmallButton>
)

const FundsCard: React.FunctionComponent<FundsCardProps> = (props) => {
  const {
    title,
    routeName = undefined,
    isComing = false,
    isDisabled = false,
  } = props

  return (
    <Grid.Item
      className={item}
      xs={4}
      s={4}
      m={4}
      l={4}
    >
      <div className={cc([style.main, isDisabled && style.disabled, isComing && style.coming])}>
        <div className={style.title}>
          <Icon
            className={style.icon}
            name='ic_leaf_32'
            namespace='investor'
          />
          <span>{title}</span>
        </div>
        {routeName ? (
          <Link
            name={routeName}
            className={style.link}
          >
            <Button {...props} />
          </Link>
        ) : (
          <Button {...props} />
        )}
      </div>
    </Grid.Item>
  )
}

export default FundsCard
