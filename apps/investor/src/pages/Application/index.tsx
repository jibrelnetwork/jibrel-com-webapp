import React from 'react'

import {
  useLanguageCode,
} from '@jibrelcom/i18n'

import {
  Grid,
  Warning,
  BigButton,
  FormTitle,
  PageWithHero,
} from '@jibrelcom/ui'

import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

import CoreLayout from 'layouts/CoreLayout'
import NotFound from 'pages/NotFound'
import {JibrelBankAccount} from 'store/types/user'
import heroImage from 'public/images/pic_hero_rocket_sun.svg'
import style from 'pages/Invest/style.scss'
import formatAmount from 'pages/Invest/utils/formatAmount'
import pageWithHeroStyle from '@jibrelcom/ui/src/PageWithHero/style.scss'
import settings from 'app/settings'
import { connect } from 'react-redux'
import { RootState } from 'store'
import {SubscriptionAgreementStatus} from 'store/types/invest'

interface OwnProps {
  id: string;
}

interface StateProps {
  offeringId: string | void;
  startupName: string | void;
  bankAccountData: JibrelBankAccount | void;
  subscriptionAmount: number | void;
}

type ApplicationProps = OwnProps & StateProps

const SuccessStep: React.FunctionComponent<{
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
            href={settings.HOST_CMS}
            variant={BigButtonVariant.secondary}
          >
            BACK TO STARTUPS
          </BigButton>
        </div>
      </div>
    </>
  )
}

const Application: React.FunctionComponent<ApplicationProps> = ({
  id,
  bankAccountData,
  subscriptionAmount,
  startupName,
  finishSigning,
  subscriptionAgreementStatus,
  getById
}) => {
  React.useEffect(() => {
    getById({ id })

    if (subscriptionAgreementStatus === SubscriptionAgreementStatus.prepared) {
      finishSigning(id)
    }
  }, [subscriptionAgreementStatus])


  return (
    <CoreLayout>
      {
        (bankAccountData && subscriptionAmount) ? (
          <Grid.Container>
            <SuccessStep
              data={bankAccountData}
              startupName={startupName}
              amount={subscriptionAmount}
            />
          </Grid.Container>
        ): <NotFound />
      }
    </CoreLayout>
  )
}

export default connect<StateProps, { getById, finishSigning }, OwnProps>(
  (state: RootState): StateProps => {
    const {
      bankAccount,
      offering,
      amount,
      depositReferenceCode,
      subscriptionAgreementStatus
    } = state.investmentApplication.data

    return {
      subscriptionAgreementStatus,
      bankAccountData: { ...bankAccount, depositReferenceCode },
      offeringId: (offering || {}).uuid,
      subscriptionAmount: amount,
      startupName: offering?.security?.company?.name
    }
  }
, (dispatch) => ({
    finishSigning: dispatch.investmentApplication.finishSigning,
    getById: dispatch.investmentApplication.getById
  }))(Application)
