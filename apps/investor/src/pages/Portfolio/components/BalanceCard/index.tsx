import React from 'react'
import { Link } from 'react-router5'

import { useI18n } from '@jibrelcom/i18n'
import {
  Grid,
  LoaderColor,
  SmallButton
} from '@jibrelcom/ui'

import CurrentBalance from 'components/CurrentBalance'

import style from '../../style.scss'

const BalanceCard: React.FC = () => {
  const i18n = useI18n()

  return (
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
  )
}

export default React.memo(BalanceCard)
