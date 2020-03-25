import React from 'react'

import {
  useLanguageCode,
} from '@jibrelcom/i18n'

import {
  Warning,
  BigButton,
  FormTitle,
  PageWithHero,
} from '@jibrelcom/ui'

import heroImage from 'public/images/pic_hero_rocket_sun.svg'
import formatAmount from 'pages/Invest/utils/formatAmount'
import pageWithHeroStyle from '@jibrelcom/ui/src/PageWithHero/style.scss'
import settings from 'app/settings'

import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

import { JibrelBankAccount } from 'store/types/user'

import style from '../style.scss'

export const SuccessStep: React.FunctionComponent<{
  data: JibrelBankAccount;
  startupName: string | void;
  amount: number;
}> = ({
  data,
  startupName,
  amount,
}) => {
  const lang = useLanguageCode()

  return (
    <>
      <PageWithHero
        imgSrc={heroImage}
        className={style.success}
        title='Subscription Submitted'
        text={`You have successfully subscribed! To complete your investment in ${startupName}, please make your transfer using the banking information below. You will also receive an email with this information shortly. For any questions related to your investment, please feel free to submit a request and your dedicated Relationship Manager will assist you.`}
      >
        <FormTitle>Subscription Amount</FormTitle>
        <div className={style.amount}>{formatAmount(amount, lang)}</div>
        <FormTitle>Jibrel Bank Account Details</FormTitle>
        <Warning className={style.warning}>
          Please make sure to add your Deposit Order ID in the Purpose of Payment, Notes, Reference, or Remarks sections.
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
      </PageWithHero>
      <div className={style.actions}>
        <div className={pageWithHeroStyle.button}>
          <BigButton
            component='button'
            onClick={window.print}
            type='button'
          >
            Download Details
          </BigButton>
        </div>
        <div className={`${pageWithHeroStyle.button} ${pageWithHeroStyle.secondary}`}>
          <BigButton
            component='a'
            href={settings.CMS_ORIGIN}
            variant={BigButtonVariant.secondary}
          >
            BACK TO STARTUPS
          </BigButton>
        </div>
      </div>
    </>
  )
}
