import React from 'react'

import {
  BigButton,
  Grid,
  FormTitle,
  Warning
} from '@jibrelcom/ui'
import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

import { JibrelBankAccount } from 'store/types/user'

import style from './style.scss'

interface WireTransferProps {
  investmentApplicationId: string;
}

const WireTransfer: React.FC<WireTransferProps> = ({
  investmentApplicationId,
}) => {
  React.useEffect(() => {

  }, [investmentApplicationId])

  const data: JibrelBankAccount = {}

  return (
    <Grid.Container
      className={style.body}
    >
      <Grid.Item
        xl={6}
        l={6}
        m={4}
      >
        <Warning className={style.warning}>
          Please make sure to add your Deposit Order ID in the Purpose of Payment,
          Notes, Reference, or Remarks sections.
        </Warning>
        <div className={style.details}>
          <div className={style.item}>
            <div className={style.label}>Bank Account Holder Name</div>
            <div className={style.value}>{data.holderName}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>IBAN</div>
            <div className={style.value}>{data.ibanNumber}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>Account Number</div>
            <div className={style.value}>{data.accountNumber}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>Bank Name</div>
            <div className={style.value}>{data.bankName}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>Bank Branch Address</div>
            <div className={style.value}>{data.branchAddress}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>BIC/SWIFT Code</div>
            <div className={style.value}>{data.swiftCode}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>Deposit Order ID</div>
            <div className={style.value}>{data.depositReferenceCode}</div>
          </div>
        </div>
      </Grid.Item>
      <Grid.Item
        component={Grid.Container}
        xl={6}
        l={6}
        m={4}
      >
        <Grid.Item>
          <FormTitle>Jibrel Bank Account Details</FormTitle>
          <div>
            Final step! From this moment we will wait for your payment. And as soon as we receive it, we will notify you, and your application will become approved.
          </div>
          <BigButton
            component='button'
            onClick={window.print}
            type='button'
          >
            Download Details
          </BigButton>
        </Grid.Item>
        <Grid.Item>
          <BigButton
            component='a'
            href='/'
            variant={BigButtonVariant.secondary}
          >
            OK, I GOT IT
          </BigButton>
        </Grid.Item>
      </Grid.Item>
    </Grid.Container>
  )
}

export default WireTransfer
