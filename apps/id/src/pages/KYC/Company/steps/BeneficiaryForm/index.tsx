import React from 'react'
import cc from 'classcat'
import arrayMutators from 'final-form-arrays'
import grid from '@jibrelcom/ui/src/Grid/grid.scss'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'

import {
  LinkButton,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'

import style from '../style.scss'
import { FormProps } from '../FormProps'
import { BeneficiaryFields } from './BeneficiaryFields'

const initialBeneficiaries = [{}]

export const BeneficiaryFormComponent: React.FunctionComponent<FormProps> = ({
  submit,
  backHandler,
  nextHandler,
  uploadDocument,
  documents,
  formValues,
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
          initialValues={formValues}
          mutators={{...arrayMutators}}
          onSubmit={submit(nextHandler)}
          render={({
            handleSubmit,
            submitError,
            form: {
              mutators: {
                push,
              },
            },
          }) => (
            <form onSubmit={handleSubmit} className={style.step}>
              <h2 className={style.title}>
                Beneficiary
              </h2>
              <div className={style.caption}>
                {'Any natural person who owns or controls, directly or indirectly, 25% or more of the shares or voting rights in the organization.'}
              </div>
              <FieldArray name="beneficiary" initialValue={initialBeneficiaries}>
                {({fields}) =>
                  fields.map((name, index) => (
                    <BeneficiaryFields
                      isPrimary={index===0}
                      key={name}
                      index={index}
                      deleteHandler={() => fields.remove(index)}
                      documents={documents}
                      uploadDocument={uploadDocument}
                    />
                  ))
                }
              </FieldArray>

              <LinkButton type="button" onClick={() => push('beneficiary', undefined)}>
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

const mapState = ({kycOrganization, kyc}) => ({
  formValues: kycOrganization.values,
  documents: kyc.documents,
})

const mapDispatch = ({kyc, kycOrganization}) => ({
  uploadDocument: kyc.uploadDocument,
  submit: (callback) => (values) =>
    kycOrganization
      .validate({step: 3, ...values})
      .then(errors => {
        if (errors) {
          return errors
        }

        return kycOrganization.addValues(values).then(callback)
      }),
})

export const BeneficiaryForm = connect(mapState, mapDispatch)(BeneficiaryFormComponent)
