import React from 'react'
import { useI18n } from '@jibrelcom/i18n'

import { JibrelBankAccount } from 'store/types/user'

import style from './style.scss'

const BankAccountDetails: React.FunctionComponent<JibrelBankAccount> = ({
  holderName,
  ibanNumber,
  accountNumber,
  bankName,
  branchAddress,
  swiftCode,
  depositReferenceCode
}) => {
  const i18n = useI18n()

  return (
    <div className={style.details}>
      <div className={style.item}>
        <div className={style.label}>
          {i18n._('ApplicationPayment.WireTransfer.details.bankAccountHolderName.title')}
        </div>
        <div className={style.value}>{holderName}</div>
      </div>
      <div className={style.item}>
        <div className={style.label}>
          {i18n._('ApplicationPayment.WireTransfer.details.iban.title')}
        </div>
        <div className={style.value}>{ibanNumber}</div>
      </div>
      <div className={style.item}>
        <div className={style.label}>
          {i18n._('ApplicationPayment.WireTransfer.details.accountNumber.title')}
        </div>
        <div className={style.value}>{accountNumber}</div>
      </div>
      <div className={style.item}>
        <div className={style.label}>
          {i18n._('ApplicationPayment.WireTransfer.details.bankName.title')}
        </div>
        <div className={style.value}>{bankName}</div>
      </div>
      <div className={style.item}>
        <div className={style.label}>
          {i18n._('ApplicationPayment.WireTransfer.details.bankBranchAddress.title')}
        </div>
        <div className={style.value}>{branchAddress}</div>
      </div>
      <div className={style.item}>
        <div className={style.label}>
          {i18n._('ApplicationPayment.WireTransfer.details.bicSwiftCode.title')}
        </div>
        <div className={style.value}>{swiftCode}</div>
      </div>
      <div className={style.item}>
        <div className={style.label}>
          {i18n._('ApplicationPayment.WireTransfer.details.depositOrderId.title')}
        </div>
        <div className={style.value}>{depositReferenceCode}</div>
      </div>
    </div>
  )
}

export default React.memo(BankAccountDetails)
