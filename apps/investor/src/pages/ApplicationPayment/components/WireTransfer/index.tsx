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

import { $Investment } from '../../model/model'

import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

import { JibrelBankAccount } from 'store/types/user'

import { InvestApplicationStore } from '../../model'


function transformToBankAccount(investmentData: InvestApplicationStore): JibrelBankAccount | void {
  if (investmentData === null) {
    return
  }

  const { bankAccount, depositReferenceCode } = investmentData

  return {
    ...bankAccount,
    depositReferenceCode,
  }
}

const WireTransfer: React.FunctionComponent = () => {
  const i18n = useI18n()
  const investmentStore = useStore($Investment)
  const data = transformToBankAccount(investmentStore)

  if (data === undefined) {
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
        component={Grid.Container}
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
            <div className={style.value}>{data.holderName}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.iban.title')}
            </div>
            <div className={style.value}>{data.ibanNumber}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.accountNumber.title')}
            </div>
            <div className={style.value}>{data.accountNumber}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.bankName.title')}
            </div>
            <div className={style.value}>{data.bankName}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.bankBranchAddress.title')}
            </div>
            <div className={style.value}>{data.branchAddress}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.bicSwiftCode.title')}
            </div>
            <div className={style.value}>{data.swiftCode}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>
              {i18n._('ApplicationPayment.WireTransfer.details.depositOrderId.title')}
            </div>
            <div className={style.value}>{data.depositReferenceCode}</div>
          </div>
        </div>
      </Grid.Item>
    </Grid.Container>
  )
}

export default WireTransfer
