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
  Input,
  Checkbox,
  FormTitle,
  PageTitle,
  ErrorToast,
  PageBackLink,
  PageWithHero,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import settings from 'app/settings'
import NotFound from 'pages/NotFound'
import CoreLayout from 'layouts/CoreLayout'
import isRequired from 'utils/validators/isRequired'
import formatSlug from 'utils/formatters/formatSlug'
import heroImage from 'public/images/pic_hero_rocket_sun.svg'
import { WaitlistFormFields } from 'store/types/waitlist'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  FormSubmit,
  FormSubmitResult,
} from 'store/types/form'

import style from './style.scss'
import AmountSelect from './components/AmountSelect'
import { WaitlistStep } from './types'

interface OwnProps {
  offeringId: string;
}

interface StateProps {
  email: string | void;
  startupName: string | void;
  isOfferingDataLoading: boolean;
}

interface DispatchProps {
  getOfferingData: (id: string) => void;
  sendOfferingSubscription: FormSubmit<WaitlistFormFields>;
}

export type WaitlistProps = OwnProps & StateProps & DispatchProps

interface WaitlistState {
  currentStep: WaitlistStep;
}

const WaitlistForm: React.FunctionComponent<FormRenderProps> = ({
  handleSubmit,
  submitError,
  values: { startupName },
}) => {
  const i18n = useI18n()

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={style.background}
      >
        <div className={style.form}>
          <FormTitle className={style.title}>
            Intended investment amount
          </FormTitle>
          <div className={style.note}>
            {`Please choose the amount you are planning to invest in ${startupName}. You can change it at any time when the startup starts to haggle.`}
          </div>
          <AmountSelect
            validate={isRequired({ i18n })}
            name='amount'
          />
          <FormTitle className={style.title}>
            Email for Notifications
          </FormTitle>
          <div className={style.note}>
            Please make sure that the email address below is the one you are willing to receive notifications to.
          </div>
          <Input
            validate={isRequired({ i18n })}
            name='email'
            label='Email'
            maxLength={256}
          />
          <Checkbox
            validate={isRequired({ i18n })}
            className={style.checkbox}
            name='isAgreedToReceiveEmails'
          >
            {`I agree to receive emails from Jibrel when ${startupName} launches. I understand that joining the waitlist does not guarantee my subscription.`}
          </Checkbox>
        </div>
        <Grid.Item
          className={style.submit}
          xs={4}
          s={4}
          m={3}
          l={4}
          xl={4}
        >
          <BigButtonSubmit>
            JOIN WAITLIST
          </BigButtonSubmit>
        </Grid.Item>
      </form>
      <div className={style.privacy}>
        For information about how we use your personal data, please see our <a
          href={`${settings.HOST_CMS}/docs/en/privacy-policy.pdf`}
        >
          Privacy Policy
        </a>.
      </div>
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
            {submitError}
          </Grid.Item>
        )}
      </div>
    </>
  )
}

const SuccessStep: React.FunctionComponent<{
  startupName: string;
}> = ({ startupName }) => {
  return (
    <PageWithHero
      imgSrc={heroImage}
      href={settings.HOST_CMS}
      text={`You have successfully joined the waitlist for ${startupName}. Once the deal is open we will notify you via email.`}
      buttonLabel='BACK TO STARTUPS'
      title='You Are on the Waitlist'
    />
  )
}

const FormStep: React.FunctionComponent<{
  handleSubmit: FormSubmit<WaitlistFormFields>;
  startupName: string;
  email: string | void;
  offeringId: string | void;
}> = ({
  handleSubmit,
  email,
  offeringId,
  startupName,
}) => (
  <>
    <PageTitle>Join Waitlist</PageTitle>
    <PageBackLink
      href={`${settings.HOST_CMS}/en/companies/${formatSlug(startupName)}`}
    >
      {`Back to ${startupName}`}
    </PageBackLink>
    <div className={style.message}>
      To ensure that you’re one of the first in line to invest in <span>{startupName}</span>, join the waitlist by submitting the form below.
    </div>
    <Form
      render={WaitlistForm}
      onSubmit={handleSubmit}
      initialValues={{
        email,
        startupName,
        amount: '',
        id: offeringId,
        isAgreedToReceiveEmails: false,
      }}
    />
  </>
)

class Waitlist extends Component<WaitlistProps, WaitlistState> {
  constructor(props: WaitlistProps) {
    super(props)

    this.state = {
      currentStep: WaitlistStep.FORM,
    }
  }

  componentDidMount(): void {
    const {
      getOfferingData,
      offeringId,
    }: WaitlistProps = this.props

    getOfferingData(offeringId)
  }

  setCurrentStep = (currentStep: WaitlistStep): void => {
    this.setState({ currentStep })
    window.scrollTo(0, 0)
  }

  handleSubmit = async (values: WaitlistFormFields): FormSubmitResult<WaitlistFormFields> => {
    try {
      const errors = await this.props.sendOfferingSubscription(values)

      if (errors) {
        return errors
      }

      this.setCurrentStep(WaitlistStep.SUCCESS)
    } catch (error) {
      return {
        [FORM_ERROR]: 'Oops, something went wrong. Please reload the page or try again later.'
      }
    }
  }

  renderCurrentStep = (): React.ReactNode => {
    const {
      email,
      offeringId,
      startupName,
    }: WaitlistProps = this.props

    if (!startupName) {
      return <NotFound />
    }

    switch (this.state.currentStep) {
      case WaitlistStep.FORM:
        return (
          <FormStep
            handleSubmit={this.handleSubmit}
            email={email}
            offeringId={offeringId}
            startupName={startupName}
          />
        )

      case WaitlistStep.SUCCESS:
        return <SuccessStep startupName={startupName} />

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
    const { profile } = state.user

    const {
      offeringData,
      isOfferingDataLoading,
    } = state.waitlist

    return {
      isOfferingDataLoading,
      email: profile && profile.userEmail,
      startupName: offeringData ? offeringData.security.company.name : undefined,
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    getOfferingData: dispatch.waitlist.getOfferingData,
    sendOfferingSubscription: dispatch.waitlist.sendOfferingSubscription,
  })
)(Waitlist)
