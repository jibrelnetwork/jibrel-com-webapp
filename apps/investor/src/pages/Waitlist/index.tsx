import React, { Component } from 'react'
import { Trans } from '@lingui/macro'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Grid,
  Input,
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
  checkSubscribed: (id: string) => Promise<boolean>;
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
          <h3 className={style.title}>
            {i18n._('Waitlist.form.amount.title')}
          </h3>
          <div className={style.note}>
            {i18n._('Waitlist.form.amount.note', { startupName })}
          </div>
          <AmountSelect validate={isRequired({ i18n })} />
          <h3 className={style.title}>
            {i18n._('Waitlist.form.email.title')}
          </h3>
          <div className={style.note}>
            {i18n._('Waitlist.form.email.note')}
          </div>
          <Input
            validate={isRequired({ i18n })}
            label={i18n._('Waitlist.form.email.label')}
            name='email'
            maxLength={256}
          />
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
            {i18n._('Waitlist.form.submit')}
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
  const i18n = useI18n()

  return (
    <PageWithHero
      imgSrc={heroImage}
      href={settings.CMS_ORIGIN}
      title={i18n._('Waitlist.success.title')}
      buttonLabel={i18n._('Waitlist.success.action.back')}
      text={i18n._('Waitlist.success.text', { startupName })}
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
}) => {
  const i18n = useI18n()

  return (
    <>
      <PageTitle>{i18n._('Waitlist.form.title')}</PageTitle>
      <PageBackLink href={`${settings.CMS_ORIGIN}/en/companies/${formatSlug(startupName)}`}>
        {i18n._('Waitlist.form.back', { startupName })}
      </PageBackLink>
      <div className={style.message}>
        <Trans
          values={{ startupName }}
          id='Waitlist.form.message'
          components={[<span key='Waitlist.form.message' />]}
        />
      </div>
      <Form
        render={WaitlistForm}
        onSubmit={handleSubmit}
        initialValues={{
          email,
          startupName,
          amount: '',
          id: offeringId,
        }}
      />
    </>
  )
}

class Waitlist extends Component<WaitlistProps, WaitlistState> {
  constructor(props: WaitlistProps) {
    super(props)

    this.state = {
      currentStep: WaitlistStep.FORM,
    }
  }

  async componentDidMount(): Promise<void> {
    const {
      checkSubscribed,
      offeringId,
    }: WaitlistProps = this.props

    const isSubscribed = await checkSubscribed(offeringId)

    if (isSubscribed) {
      this.setCurrentStep(WaitlistStep.SUCCESS)
    }
  }

  setCurrentStep = (currentStep: WaitlistStep): void => {
    this.setState({ currentStep })
    window.scrollTo(0, 0)
  }

  handleSubmit = async (values: WaitlistFormFields): FormSubmitResult<WaitlistFormFields> => {
    const errors = await this.props.sendOfferingSubscription(values)

    if (errors) {
      return errors
    }

    this.setCurrentStep(WaitlistStep.SUCCESS)
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
    checkSubscribed: dispatch.waitlist.checkSubscribed,
    sendOfferingSubscription: dispatch.waitlist.sendOfferingSubscription,
  })
)(Waitlist)
