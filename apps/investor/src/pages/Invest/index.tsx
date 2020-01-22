import React, { Component } from 'react'
import { Grid } from '@jibrelcom/ui'
import { connect } from 'react-redux'

import {
  useI18n,
  useLanguageCode,
} from '@jibrelcom/i18n'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Icon,
  Link,
  BigButton,
  LinkButton,
  PageWithHero,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import settings from 'app/settings'
import NotFound from 'pages/NotFound'
import CoreLayout from 'layouts/CoreLayout'
import STARTUP_NAMES from 'data/startupNames.json'
import isRequired from 'utils/validators/isRequired'
import heroImage from 'public/images/pic_hero_invest_process.svg'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  FormSubmit,
  FormSubmitResult,
} from 'store/types/form'

import {
  BankAccount,
  InvestFormFields,
} from 'store/types/invest'

import { RiskDisclosures } from 'components'

import style from './style.scss'
import formatAmount from './utils/formatAmount'
import { InvestStep } from './types'

import {
  DealTerms,
  CustomerData,
  InvestmentInput,
} from './components'

interface OwnProps {
  slug: string;
}

interface StateProps {
  offeringId: string | void;
  bankAccountData: BankAccount | void;
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

const InvestForm = ({ handleSubmit }: FormRenderProps): React.ReactNode => {
  const i18n = useI18n()

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.form}>
        <h2 className={style.subtitle}>{i18n._('Invest.form.amount.title')}</h2>
        <InvestmentInput
          validate={isRequired({ i18n })}
          name='amount'
          maxLength={256}
        />
      </div>
      <LinkButton
        onClick={window.print}
        className={style.download}
        type='button'
      >
        Download subscription agreement
      </LinkButton>
      <p className={style.agreement}>
        By clicking <span>
          Accept and Sign
        </span>, I understand and agree that this is a legal representation of my handwritten signature/initials.
      </p>
      <BigButtonSubmit className={style.submit}>
        Accept and Sign
      </BigButtonSubmit>
    </form>
  )
}

const BackLink: React.FunctionComponent<{
  slug: string;
}> = ({ slug }) => (
  <div className={style.back}>
    <Icon
      className={style.icon}
      name='ic_arrow_right_24'
    />
    <Link href={`//jibrel.com/en/companies/${slug}`}>
      {`Back to ${STARTUP_NAMES[slug]}`}
    </Link>
  </div>
)

const RisksStep: React.FunctionComponent<{
  handleClick: () => void;
  slug: string;
}> = ({
  handleClick,
  slug,
}) => (
  <>
    <BackLink slug={slug} />
    <h1 className={style.title}>Risk Disclosures</h1>
    <RiskDisclosures />
    <BigButton
      onClick={handleClick}
      className={style.submit}
      type='button'
    >
      I agree
    </BigButton>
  </>
)

const SuccessStep: React.FunctionComponent<{
  data: BankAccount;
  slug: string;
  amount: number;
}> = ({
  data,
  slug,
  amount,
}) => {
  const lang = useLanguageCode()

  return (
    <PageWithHero
      imgSrc={heroImage}
      secondaryHref={settings.HOST_CMS}
      buttonLabel='Download Details'
      href='javascript: window.print()'
      secondaryButtonLabel='BACK TO STARTUPS'
      title='You Have Successfully Subscribed'
      text={`You have successfully subscribed! To complete your investment in ${STARTUP_NAMES[slug]}, please make your transfer using the banking information below. You will also receive an email with this information shortly. For any questions related to your investment, please feel free to submit a request and your dedicated Relationship Manager will assist you.`}
    >
      <h2 className={style.subtitle}>Subscription Amount</h2>
      <div className={style.amount}>{formatAmount(amount, lang)}</div>
      <h2 className={style.subtitle}>Jibrel Bank Account Details</h2>
      <div className={style.warning}>
        <Icon
          name='ic_exclamation_24'
          className={style.exclamation}
        />
        <span>
          Please make sure to add your Deposit Order ID in the Purpose of Payment, Notes, Reference, or Remarks sections.
        </span>
      </div>
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
          <div className={style.label}>BIC/SWIFT Code</div>
          <div className={style.value}>{data.swiftCode}</div>
        </div>
        <div className={style.item}>
          <div className={style.label}>Deposit Order ID</div>
          <div className={style.value}>{data.depositReferenceCode}</div>
        </div>
      </div>
    </PageWithHero>
  )
}

const FormStep: React.FunctionComponent<{
  handleSubmit: FormSubmit<InvestFormFields>;
  slug: string;
  offeringId: string | void;
}> = ({
  handleSubmit,
  slug,
  offeringId,
}) => (
  <>
    <BackLink slug={slug} />
    <h1 className={style.title}>{`Invest to ${STARTUP_NAMES[slug]}`}</h1>
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
    const errors = await this.props.sendOfferingApplication(values)

    if (errors) {
      return errors
    }

    this.setCurrentStep(InvestStep.SUCCESS)
  }

  renderCurrentStep = (): React.ReactNode => {
    const {
      bankAccountData,
      slug,
      offeringId,
      subscriptionAmount,
    }: InvestProps = this.props

    if (!offeringId) {
      return <NotFound />
    }

    switch (this.state.currentStep) {
      case InvestStep.RISKS:
        return (
          <Grid.Item
            component={RisksStep}
            handleClick={this.agreeWithRisks}
            slug={slug}
            xs={4}
            s={8}
            m={5}
            l={8}
            xl={8}
          />
        )

      case InvestStep.FORM:
        return (
          <FormStep
            handleSubmit={this.handleSubmit}
            slug={slug}
            offeringId={offeringId}
          />
        )

      case InvestStep.SUCCESS:
        return (bankAccountData && subscriptionAmount) ? (
          <SuccessStep
            data={bankAccountData}
            slug={slug}
            amount={subscriptionAmount}
          />
        ) : <NotFound />

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
        <Grid.Container>
          {this.renderCurrentStep()}
        </Grid.Container>
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
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    getOfferingData: dispatch.invest.getOfferingData,
    sendOfferingApplication: dispatch.invest.sendOfferingApplication,
  })
)(Invest)
