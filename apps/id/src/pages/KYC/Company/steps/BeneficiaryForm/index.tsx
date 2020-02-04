import React from 'react'
import cc from 'classcat'
import arrayMutators from 'final-form-arrays'
import grid from '@jibrelcom/ui/src/Grid/grid.scss'
import { connect } from 'react-redux'

import {
  FieldArray,
  FieldArrayProps,
} from 'react-final-form-arrays'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  LinkButton,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'

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
  submit: (callback: () => void) => (values: KYCInstitutionValues) => Promise<KYCInstitutionValues> | void;
}

interface OwnProps {
  backHandler: () => void;
  nextHandler: () => void;
  backLabel: string;
  nextLabel: string;
}

export type BeneficiaryProps = StateProps & DispatchProps & OwnProps

export const Beneficiary: React.FunctionComponent<BeneficiaryProps> = ({
  submit,
  backHandler,
  nextHandler,
  uploadDocument,
  values,
  documents,
  backLabel,
  nextLabel,
}) => {
  return (
    <KYCLayout
      backHandler={backHandler}
      backLabel={backLabel}
    >
      <div
        className={cc([
          grid.grid,
          style.beneficiary,
          style.background,
        ])}
      >
        <Form
          onSubmit={submit(nextHandler)}
          initialValues={values}
          mutators={{ ...arrayMutators }}
          render={({
            handleSubmit,
            submitError,
            values: { beneficiaries },
            form: {
              mutators: {
                push,
              },
            },
          }: FormRenderProps): React.ReactNode => (
            <form onSubmit={handleSubmit} className={style.step}>
              <h2 className={style.title}>
                Beneficiary
              </h2>
              <div className={style.caption}>
                Any natural person who owns or controls, directly or indirectly, 25% or more of the shares or voting rights in the organization.
              </div>
              <FieldArray name='beneficiaries' initialValue={beneficiaries}>
                {({ fields }: FieldArrayProps<ContactValues, HTMLElement>): React.ReactNode => fields.map((
                  name: string,
                  index: number,
                ) => (
                    <BeneficiaryFields
                      key={name}
                      deleteHandler={(): void => fields.remove(index)}
                      documents={documents}
                      uploadDocument={uploadDocument}
                      index={index}
                      isPrimary={(index === 0)}
                    />
                  ))}
              </FieldArray>
              <LinkButton type='button' onClick={(): void => push('beneficiaries', undefined)}>
                + ADD MORE BENEFICIARIES
              </LinkButton>
              {submitError && <div className={style.submitError}>{submitError}</div>}
              <BigButtonSubmit className={style.submit}>
                {nextLabel}
              </BigButtonSubmit>
            </form>
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
    submit: (
      callback: () => void,
    ) => (
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
