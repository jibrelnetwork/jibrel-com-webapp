import React from 'react'
import { useStore } from 'effector-react'

import { useI18n } from '@jibrelcom/i18n'
import {
  BigButton,
  Grid,
  FormTitle,
  Warning
} from '@jibrelcom/ui'

import style from './style.scss'

import {
  $BankAccount,
} from '../../model'

import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

const WireTransfer: React.FunctionComponent = () => {
  const i18n = useI18n()
  const bankAccountData = useStore($BankAccount)

  if (bankAccountData === null) {
    // TODO: Woops, something went wrong
    return null
  }

  return (
    <Grid.Container
      className={style.body}
    >
      <Grid.Item
        xl={6}
        l={6}
        m={4}
        className={style.header}
      >
        <FormTitle>{i18n._('ApplicationPayment.WireTransfer.title')}</FormTitle>
        <div>
          {i18n._('ApplicationPayment.WireTransfer.subtext')}
        </div>
      </Grid.Item>
      <Grid.Item
        xl={6}
        l={6}
        m={4}
        className={style.actions}
      >
        <Grid.Item
          s={4}
          m={8}
          l={12}
          xl={12}
          className={style.button}
        >
          <BigButton
            component='button'
            onClick={window.print}
            type='button'
          >
            {i18n._('ApplicationPayment.WireTransfer.actions.download')}
          </BigButton>
        </Grid.Item>
        <Grid.Item
          s={4}
          m={8}
          l={12}
          xl={12}
          className={style.button}
        >
          <BigButton
            component='a'
            href='/'
            variant={BigButtonVariant.secondary}
          >
            {i18n._('ApplicationPayment.WireTransfer.actions.skip')}
          </BigButton>
        </Grid.Item>
      </Grid.Item>
      <Grid.Item
        xl={6}
        l={6}
        m={4}
        className={style.detailsWrapper}
      >
        <Warning className={style.warning}>
          {i18n._('ApplicationPayment.WireTransfer.details.warning.text')}
        </Warning>
        <div className={style.details}>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.bankAccountHolderName.title')}
            </div>
            <div className={style.value}>{bankAccountData.holderName}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.iban.title')}
            </div>
            <div className={style.value}>{bankAccountData.ibanNumber}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.accountNumber.title')}
            </div>
            <div className={style.value}>{bankAccountData.accountNumber}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.bankName.title')}
            </div>
            <div className={style.value}>{bankAccountData.bankName}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.bankBranchAddress.title')}
            </div>
            <div className={style.value}>{bankAccountData.branchAddress}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.bicSwiftCode.title')}
            </div>
            <div className={style.value}>{bankAccountData.swiftCode}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.depositOrderId.title')}
            </div>
            <div className={style.value}>{bankAccountData.depositReferenceCode}</div>
          </div>
        </div>
      </Grid.Item>
    </Grid.Container>
  )
}

export default React.memo(WireTransfer)
