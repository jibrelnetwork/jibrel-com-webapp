import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
  Animation,
  Grid,
  BigButton,
  PageWithHero,
} from '@jibrelcom/ui'

import CoreLayout from 'layouts/CoreLayout'
import SplashMarkup from 'layouts/SplashMarkup'
import errorImage from 'public/images/pic_unknown_error.svg'
import pageWithHeroStyle from '@jibrelcom/ui/src/PageWithHero/style.scss'
import settings from 'app/settings'
import { router } from 'app/router'

import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

import { Dispatch, RootState } from 'store'
import { JibrelBankAccount } from 'store/types/user'
import { InvestApplication, SubscriptionAgreementStatus } from 'store/types/invest'

import style from './style.scss'

interface OwnProps {
  id: string;
}

interface StateProps {
  startupName: string | void;
  startupSlug: string | void;
  bankAccountData: JibrelBankAccount | void;
  subscriptionAmount: number | void;
  applicationAgreementStatus: SubscriptionAgreementStatus | void;
}

interface DispatchProps {
  getById: (id: string) => Promise<InvestApplication>;
  finishSigning: (id: string) => Promise<void>;
}

type ApplicationProps = OwnProps & StateProps & DispatchProps

interface ErrorStepProps {
  slug: string | void;
}

const ErrorStep: React.FunctionComponent<ErrorStepProps> = ({ slug }) => (
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
          href={slug ? `/invest/${slug}` : settings.CMS_ORIGIN}
          variant={BigButtonVariant.main}
        >
          back to startup invest
        </BigButton>
      </div>
    </Grid.Container>
  </CoreLayout>
)

const Application: React.FunctionComponent<ApplicationProps> = ({
  id,
  startupSlug,
  finishSigning,
  getById
}) => {
  const [ isError, setIsError ] = useState<boolean>(false)

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        await finishSigning(id)
        const application = await getById(id)

        if (!application || application.subscriptionAgreementStatus === SubscriptionAgreementStatus.success) {
          router.navigate('ApplicationPayment', { id })
          return
        }

        setIsError(application.subscriptionAgreementStatus === SubscriptionAgreementStatus.error)
      } catch(error) {
        setIsError(true)
      }
    })()
  }, [])

  if (isError) {
    return <ErrorStep slug={startupSlug} />
  }

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

Application.displayName = 'ApplicationPage'

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState): StateProps => {
    const {
      bankAccountData,
      offeringData,
      subscriptionAmount,
      applicationAgreementStatus,
    } = state.invest

    const company = offeringData ? offeringData?.security?.company : { name: '', slug: ' '}

    return {
      applicationAgreementStatus,
      bankAccountData,
      subscriptionAmount,
      startupName: company.name,
      startupSlug: company.slug
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    finishSigning: dispatch.invest.finishSigning,
    getById: dispatch.invest.getApplicationById
  }))(Application)
