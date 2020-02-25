import React, { Component } from 'react'
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
  submitErrors,
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
          By clicking <span>
            Accept and Sign
          </span>, I understand and agree that this is a legal representation of my handwritten signature/initials.
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
            Accept and Sign
          </BigButtonSubmit>
        </Grid.Item>
      </form>
      <div className={style.error}>
        {submitErrors && submitErrors[FORM_ERROR] && (
          <Grid.Item
            component={ErrorToast}
            xl={8}
            l={8}
            m={4}
            s={4}
            xs={4}
          >
            {submitErrors[FORM_ERROR]}
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
}) => !startupName ? null : (
  <PageBackLink
    className={style.back}
    href={`${settings.HOST_CMS}/en/companies/${slug}`}
  >
    {`Back to ${startupName}`}
  </PageBackLink>
)

const RisksStep: React.FunctionComponent<{
  handleClick: () => void;
  slug: string;
  startupName: string | void;
}> = ({
  handleClick,
  slug,
  startupName,
}) => (
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
          component='button'
          onClick={handleClick}
          type='button'
        >
          Accept
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
        By pressing the <span className={style.bold}>Accept</span> button, you acknowledge that you have read, understood and accept the risks set out above.
      </Grid.Item>
    </Grid.Container>
  </>
)

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
}) => (
  <>
    <BackLink slug={slug} startupName={startupName} />
    <PageTitle>{`Invest in ${startupName}`}</PageTitle>
    <DealTerms slug={slug} />
    <div className={style.note}>
      To continue, you need to sign the Subscription Agreement by electronic signature. Before you do this, please enter your Subscription Amount
    </div>
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
      await this.props.sendOfferingApplication(values)
    } catch (error) {
      console.error(error)

      return {
        [FORM_ERROR]: 'Oops, something went wrong. Please reload the page or try again later.'
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
