import React, { Component } from 'react'
import { Trans } from '@lingui/macro'
import { connect } from 'react-redux'
import { FORM_ERROR } from 'final-form'
import { useI18n } from '@jibrelcom/i18n'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Grid,
  BigButton,
  FormTitle,
  PageTitle,
  PageBackLink,
  BigButtonSubmit,
  ErrorToast,
} from '@jibrelcom/ui'

import settings from 'app/settings'
import NotFound from 'pages/NotFound'
import CoreLayout from 'layouts/CoreLayout'
import isRequired from 'utils/validators/isRequired'
import { JibrelBankAccount } from 'store/types/user'
import { InvestFormFields } from 'store/types/invest'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  FormSubmit,
  FormSubmitResult,
} from 'store/types/form'

import {
  InvestmentInput,
  RiskDisclosures,
} from 'components'

import style from './style.scss'
import { InvestStep } from './types'

import {
  DealTerms,
  CustomerData,
} from './components'

interface OwnProps {
  slug: string;
}

interface StateProps {
  offeringId: string | void;
  startupName: string | void;
  bankAccountData: JibrelBankAccount | void;
  subscriptionAmount: number | void;
  isOfferingDataLoading: boolean;
}

interface DispatchProps {
  getOfferingData: (id: string) => void;
  sendOfferingApplication: FormSubmit<InvestFormFields>;
}

export type InvestProps = OwnProps & StateProps & DispatchProps

interface InvestState {
  currentStep: InvestStep;
}

const InvestForm: React.FunctionComponent<FormRenderProps> = ({
  handleSubmit,
  submitError,
}) => {
  const i18n = useI18n()

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={style.form}>
          <FormTitle>{i18n._('Invest.form.amount.title')}</FormTitle>
          <InvestmentInput
            validate={isRequired({ i18n })}
            name='amount'
            maxLength={256}
          />
        </div>
        <p className={style.agreement}>
          <Trans
            id='Invest.form.agreement'
            components={[<span key='Invest.form.agreement' />]}
          />
        </p>
        <Grid.Item
          className={style.submit}
          xs={4}
          s={4}
          m={4}
          l={3}
          xl={4}
        >
          <BigButtonSubmit>
            {i18n._('Invest.form.submit')}
          </BigButtonSubmit>
        </Grid.Item>
      </form>
      <div className={style.error}>
        {submitError && (
          <Grid.Item
            component={ErrorToast}
            xl={8}
            l={8}
            m={4}
            s={4}
            xs={4}
          >
            {i18n._('Invest.form.error')}
          </Grid.Item>
        )}
      </div>
    </>
  )
}

const BackLink: React.FunctionComponent<{
  slug: string;
  startupName: string | void;
}> = ({
  slug,
  startupName,
}) => {
  const i18n = useI18n()

  return !startupName ? null : (
    <PageBackLink
      className={style.back}
      href={`${settings.CMS_ORIGIN}/en/companies/${slug}`}
    >
      {i18n._('Invest.back', { startupName })}
    </PageBackLink>
  )
}

const RisksStep: React.FunctionComponent<{
  handleClick: () => void;
  slug: string;
  startupName: string | void;
}> = ({
  handleClick,
  slug,
  startupName,
}) => {
  const i18n = useI18n()

  return (
    <>
      <Grid.Container>
        <Grid.Item
          xs={4}
          s={8}
          m={5}
          l={8}
          xl={8}
        >
          <BackLink slug={slug} startupName={startupName} />
          <RiskDisclosures />
        </Grid.Item>
      </Grid.Container>
      <Grid.Container className={`${style.submit} ${style.sticky}`}>
        <Grid.Item
          xs={4}
          s={4}
          m={3}
          l={4}
          xl={4}
        >
          <BigButton
            onClick={handleClick}
            type='button'
          >
            {i18n._('Invest.risks.submit')}
          </BigButton>
        </Grid.Item>
        <Grid.Item
          xs={4}
          s={8}
          m={4}
          l={4}
          xl={4}
          className={style.buttonDescription}
        >
          <Trans
            id='Invest.risks.description'
            components={[<span key='Invest.risks.description' />]}
          />
        </Grid.Item>
      </Grid.Container>
    </>
  )
}

const FormStep: React.FunctionComponent<{
  handleSubmit: FormSubmit<InvestFormFields>;
  slug: string;
  offeringId: string | void;
  startupName: string | void;
}> = ({
  handleSubmit,
  slug,
  offeringId,
  startupName,
}) => {
  const i18n = useI18n()

  return (
    <>
      <BackLink slug={slug} startupName={startupName} />
      <PageTitle>{i18n._('Invest.form.title', { startupName })}</PageTitle>
      <DealTerms slug={slug} />
      <div className={style.note}>{i18n._('Invest.form.note')}</div>
      <CustomerData />
      <Form
        render={InvestForm}
        onSubmit={handleSubmit}
        initialValues={{
          amount: '',
          id: offeringId,
          isAgreedRisks: true,
          isAgreedSubscription: true,
        }}
      />
    </>
  )
}

class Invest extends Component<InvestProps, InvestState> {
  constructor(props: InvestProps) {
    super(props)

    this.state = {
      currentStep: InvestStep.RISKS,
    }
  }

  componentDidMount(): void {
    const {
      getOfferingData,
      slug,
    }: InvestProps = this.props

    getOfferingData(slug)
  }

  setCurrentStep = (currentStep: InvestStep): void => {
    this.setState({ currentStep })
    window.scrollTo(0, 0)
  }

  agreeWithRisks = (): void => this.setCurrentStep(InvestStep.FORM)

  handleSubmit = async (values: InvestFormFields): FormSubmitResult<InvestFormFields> => {
    try {
      const errors = await this.props.sendOfferingApplication(values)

      if (errors) {
        return errors
      }
    } catch (error) {
      console.error(error)

      return {
        [FORM_ERROR]: 'FORM_ERROR',
      }
    }
  }

  renderCurrentStep = (): React.ReactNode => {
    const {
      slug,
      offeringId,
      startupName,
    }: InvestProps = this.props

    if (!offeringId) {
      return <NotFound />
    }

    switch (this.state.currentStep) {
      case InvestStep.RISKS:
        return (
          <RisksStep
            handleClick={this.agreeWithRisks}
            slug={slug}
            startupName={startupName}
          />
        )

      case InvestStep.FORM:
        return (
          <Grid.Container>
            <FormStep
              handleSubmit={this.handleSubmit}
              slug={slug}
              offeringId={offeringId}
              startupName={startupName}
            />
          </Grid.Container>
        )

      default:
        return null
    }
  }

  render(): React.ReactNode {
    if (this.props.isOfferingDataLoading) {
      return null
    }

    return (
      <CoreLayout>
        {this.renderCurrentStep()}
      </CoreLayout>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => {
    const {
      offeringData,
      bankAccountData,
      subscriptionAmount,
      isOfferingDataLoading,
    } = state.invest

    return {
      bankAccountData,
      isOfferingDataLoading,
      offeringId: (offeringData || {}).uuid,
      subscriptionAmount: subscriptionAmount,
      startupName: offeringData ? offeringData.security.company.name : undefined,
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    getOfferingData: dispatch.invest.getOfferingData,
    sendOfferingApplication: dispatch.invest.sendOfferingApplication,
  })
)(Invest)
