import React, { useState } from 'react'
import cc from 'classcat'
import arrayMutators from 'final-form-arrays'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import {
  FieldArray,
  FieldArrayProps,
} from 'react-final-form-arrays'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Grid,
  FormTitle,
  BigButton,
  LinkButton,
  BigButtonSubmit,
  BigButtonVariant,
} from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'
import { initialFormValues } from 'store/models/kycOrganization'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  Documents,
  ContactValues,
  KYCInstitutionValues,
  UploadDocumentHandler,
} from 'store/types/kyc'

import style from '../style.scss'
import { BeneficiaryFields } from './BeneficiaryFields'

interface StateProps {
  documents: Documents;
  values: KYCInstitutionValues;
}

interface DispatchProps {
  uploadDocument: UploadDocumentHandler;
  submit: (callback: () => void) => (values: KYCInstitutionValues) =>
    Promise<KYCInstitutionValues> | void;
}

interface OwnProps {
  backHandler: () => void;
  nextHandler: () => void;
  backLabel: string;
  nextLabel: string;
}

export type BeneficiaryProps = StateProps & DispatchProps & OwnProps

type BeneficiaryFormProps = BeneficiaryProps & {
  formProps: FormRenderProps;
}

type BeneficiaryConfirmationProps = BeneficiaryFormProps & {
  confirmBeneficiary: () => void;
}

const BeneficiaryConfirmation: React.FunctionComponent<BeneficiaryConfirmationProps> = ({
  confirmBeneficiary,
  formProps,
}) => {
  const i18n = useI18n()

  const {
    handleSubmit,
    form: { change },
    submitting,
  } = formProps

  const skipBeneficiary = (): void => {
    change('beneficiaries', [])
    handleSubmit()
  }

  return (
    <>
      <Grid.Container>
        <Grid.Item
          xs={4}
          s={5}
          m={4}
          l={5}
        >
          <FormTitle>
            {i18n._('KYC.Company.beneficiary.form.title')}
          </FormTitle>
          <p className={style.question}>
            {i18n._('KYC.Company.beneficiary.form.question')}
          </p>
        </Grid.Item>
      </Grid.Container>
      <Grid.Container>
        <Grid.Item
          className={style.actions}
          xs={4}
          s={4}
          m={3}
          l={4}
        >
          <BigButton
            onClick={confirmBeneficiary}
            variant={BigButtonVariant.main}
            component='button'
          >
            {i18n._('KYC.Company.beneficiary.form.action.yes')}
          </BigButton>
          <BigButton
            onClick={skipBeneficiary}
            className={style.no}
            variant={BigButtonVariant.secondary}
            component='button'
            isLoading={submitting}
            isDisabled={submitting}
          >
            {i18n._('KYC.Company.beneficiary.form.action.no')}
          </BigButton>
        </Grid.Item>
      </Grid.Container>
    </>
  )
}

const BeneficiaryForm: React.FunctionComponent<BeneficiaryFormProps> = ({
  uploadDocument,
  documents,
  nextLabel,
  formProps,
}) => {
  const {
    handleSubmit,
    values,
    submitError,
    form: {
      change,
      mutators,
    },
  } = formProps

  const i18n = useI18n()

  if (values.beneficiaries.length === 0) {
    change('beneficiaries', initialFormValues.beneficiaries)
  }

  return (
    <>
      <Grid.Container
        component='form'
        onSubmit={handleSubmit}
      >
        <Grid.Item
          xs={4}
          s={5}
          m={4}
          l={5}
        >
          <FormTitle>
            {i18n._('KYC.Company.beneficiary.form.title')}
          </FormTitle>
          <div className={style.caption}>
            {i18n._('KYC.Company.beneficiary.form.description')}
          </div>
          <FieldArray name='beneficiaries' initialValue={values.beneficiaries}>
            {({
              fields,
            }: FieldArrayProps<ContactValues, HTMLElement>): React.ReactNode => fields.map((
              name: string,
              index: number,
            ) => (
              <BeneficiaryFields
                key={name}
                uploadDocument={uploadDocument}
                deleteHandler={(): void => fields.remove(index)}
                documents={documents}
                index={index}
                isPrimary={(index === 0)}
              />
            ))}
          </FieldArray>
          <LinkButton
            onClick={(): void => mutators.push('beneficiaries', undefined)}
            type='button'
          >
            {i18n._('KYC.Company.beneficiary.form.button.add')}
          </LinkButton>
          {submitError && <div className={style.submitError}>{submitError}</div>}
        </Grid.Item>
      </Grid.Container>
      <Grid.Container>
        <Grid.Item
          className={style.actions}
          xs={4}
          s={4}
          m={3}
          l={4}
        >
          <BigButtonSubmit>{nextLabel}</BigButtonSubmit>
        </Grid.Item>
      </Grid.Container>
    </>
  )
}

export const Beneficiary: React.FunctionComponent<BeneficiaryProps> = (props) => {
  const {
    submit,
    backHandler,
    nextHandler,
    values,
    backLabel,
  } = props

  const [isBeneficiaryConfirmed, setBeneficiaryConfirmed] = useState<boolean>(false)

  return (
    <KYCLayout
      backHandler={backHandler}
      backLabel={backLabel}
    >
      <div
        className={cc([
          style.beneficiary,
          style.background,
        ])}
      >
        <Form
          onSubmit={submit(nextHandler)}
          initialValues={values}
          mutators={{ ...arrayMutators }}
          render={(formProps: FormRenderProps): React.ReactNode => (
            <>
              {isBeneficiaryConfirmed ? (
                <BeneficiaryForm
                  {...props}
                  formProps={formProps}
                />
              ) : (
                <BeneficiaryConfirmation
                  {...props}
                  formProps={formProps}
                  confirmBeneficiary={(): void => setBeneficiaryConfirmed(true)}
                />
              )}
            </>
          )}
        />
      </div>
    </KYCLayout>
  )
}

export default connect(
  (state: RootState) => ({
    documents: state.kyc.documents,
    values: state.kycOrganization.values,
  }),
  (dispatch: Dispatch) => ({
    submit: (callback: () => void) => (
      values: KYCInstitutionValues,
    ): Promise<KYCInstitutionValues> | void => dispatch.kycOrganization
      .validate({ step: 3, ...values })
      .then(errors => {
        if (errors) {
          return errors
        }

        return dispatch.kycOrganization.addValues(values).then(callback)
      }),
    uploadDocument: dispatch.kyc.uploadDocument,
  }),
)(Beneficiary)
