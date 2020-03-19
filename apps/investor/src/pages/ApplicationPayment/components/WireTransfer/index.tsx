import React from 'react'
import { useStore } from 'effector-react'
import { useI18n } from '@jibrelcom/i18n'
import {
  BigButton,
  DetailsCard,
  Grid,
  FormTitle,
  Warning
} from '@jibrelcom/ui'
import { combineLabelsWithData } from '@jibrelcom/ui/src/DetailsCard/combineLabelsWithData'

import style from './style.scss'

import {
  $BankAccount,
} from '../../model'

import { JibrelBankAccount } from 'store/types/user'
import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

const DETAILS_LABEL_MAP: [string, keyof JibrelBankAccount][] = [
  [
    'ApplicationPayment.WireTransfer.details.bankAccountHolderName.title',
    'holderName'
  ],
  [
    'ApplicationPayment.WireTransfer.details.iban.title',
    'ibanNumber'
  ],
  [
    'ApplicationPayment.WireTransfer.details.accountNumber.title',
    'accountNumber'
  ],
  [
    'ApplicationPayment.WireTransfer.details.bankName.title',
    'bankName'
  ],
  [
    'ApplicationPayment.WireTransfer.details.bankBranchAddress.title',
    'branchAddress'
  ],
  [
    'ApplicationPayment.WireTransfer.details.bicSwiftCode.title',
    'swiftCode'
  ],
  [
    'ApplicationPayment.WireTransfer.details.depositOrderId.title',
    'depositReferenceCode'
  ]
]

const WireTransfer: React.FunctionComponent = () => {
  const i18n = useI18n()
  const bankAccountData = useStore($BankAccount)

  if (bankAccountData === null) {
    // TODO: Woops, something went wrong
    return null
  }

  const details = combineLabelsWithData<JibrelBankAccount>(DETAILS_LABEL_MAP, bankAccountData)

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
        <p className={style.subtext}>
          {i18n._('ApplicationPayment.WireTransfer.subtext')}
        </p>
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
        <DetailsCard itemList={details} />
      </Grid.Item>
    </Grid.Container>
  )
}

export default React.memo(WireTransfer)
