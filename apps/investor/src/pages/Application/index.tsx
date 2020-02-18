import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
  useLanguageCode,
} from '@jibrelcom/i18n'

import {
  Animation,
  Grid,
  Warning,
  BigButton,
  FormTitle,
  PageWithHero,
} from '@jibrelcom/ui'


import CoreLayout from 'layouts/CoreLayout'
import SplashMarkup from 'layouts/SplashMarkup'
import NotFound from 'pages/NotFound'
import heroImage from 'public/images/pic_hero_rocket_sun.svg'
import errorImage from 'public/images/pic_unknown_error.svg'
import formatAmount from 'pages/Invest/utils/formatAmount'
import pageWithHeroStyle from '@jibrelcom/ui/src/PageWithHero/style.scss'
import settings from 'app/settings'

import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

import { Dispatch, RootState } from 'store'
import { JibrelBankAccount } from 'store/types/user'
import { InvestApplication, SubscriptionAgreementStatus} from 'store/types/invest'

import style from './style.scss'

interface OwnProps {
  id: string;
}

interface StateProps {
  startupName: string | void;
  startupSlug: string | void;
  bankAccountData: JibrelBankAccount | void;
  subscriptionAmount: number | void;
}

interface DispatchProps {
  getById: (id: string) => Promise<InvestApplication>;
  finishSigning: (id: string) => Promise<InvestApplication>;
}

type ApplicationProps = OwnProps & StateProps & DispatchProps

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
  startupSlug,
  finishSigning,
  getById
}) => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ isError, setIsError ] = useState(false)

  useEffect(() => {
    (async (): Promise<void> => {
      setIsLoading(true)
      try {
        await finishSigning(id)
        const { data: application } = await getById(id)

        setIsError(application.data.subscriptionAgreementStatus === SubscriptionAgreementStatus.error)
      } catch(error) {
        setIsError(true)
      }

      setIsLoading(false)
    })()
  }, [])

  if (isError) {
    return (
      <CoreLayout>
        <Grid.Container>
          <PageWithHero
            imgSrc={errorImage}
            title='Something Went Wrong'
            text='We are already working to resolve this issue. Please, go back and try again.'
          />
          <div className={pageWithHeroStyle.button}>
            <BigButton
              component='a'
              href={`/invest/${startupSlug}`}
              variant={BigButtonVariant.main}
            >
              back to startup invest
            </BigButton>
          </div>
        </Grid.Container>
      </CoreLayout>
    )
  }

  if (isLoading) {
    return (
      <CoreLayout>
        <Grid.Container>
          <SplashMarkup
            header={<Animation.Component
              loadAnimation={Animation.loaders.hourglass}
              className={style.anim}
              loop
            />}
            title='Verifying...'
            text='This may take several minutes. Please do not close this page until the end of the process.'
          />
        </Grid.Container>
      </CoreLayout>
    )
  }

  return (
    <CoreLayout>
      {
        (bankAccountData && subscriptionAmount) ? (
          <SuccessStep
            data={bankAccountData}
            startupName={startupName}
            amount={subscriptionAmount}
          />
        ): <NotFound />
      }
    </CoreLayout>
  )
}

Application.displayName = 'ApplicationPage'

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState): StateProps => {
    const {
      bankAccountData,
      offeringData,
      subscriptionAmount,
    } = state.invest

    const company = offeringData ? offeringData?.security?.company : { name: '', slug: ' '}

    return {
      bankAccountData,
      subscriptionAmount,
      startupName: company.name,
      startupSlug: company.slug
    }
  }
, (dispatch: Dispatch): DispatchProps => ({
    finishSigning: dispatch.invest.finishSigning,
    getById: dispatch.invest.getApplicationById
  }))(Application)
