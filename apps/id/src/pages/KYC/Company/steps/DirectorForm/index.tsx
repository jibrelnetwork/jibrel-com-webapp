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
import { DirectorFields } from './DirectorFields'

const initialDocuments = ['']

export const DirectorFormComponent: React.FunctionComponent<FormProps> = ({
  submit,
  backHandler,
  nextHandler,
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
          style.director,
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
                Director
              </h2>
              <div className={style.caption}>
                {'Please insert full legal names of members of the board of directors.'}
              </div>
              <FieldArray name="directors" initialValue={initialDocuments}>
                {({fields}) =>
                  fields.map((name, index) => (
                    <DirectorFields
                      isPrimary={index === 0}
                      key={name}
                      index={index}
                      deleteHandler={() => fields.remove(index)}
                    />
                  ))
                }
              </FieldArray>
              <LinkButton className={style.addLink} type="button"
                    onClick={() => push('directors', undefined)}>
                + ADD MORE DIRECTORS
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

const mapState = ({kycOrganization}) => ({
  formValues: kycOrganization.values,
})

const mapDispatch = ({kycOrganization}) => ({
  submit: (callback) => (values) =>
    kycOrganization
      .validate({step: 4, ...values})
      .then(errors => {
        if (errors) {
          return errors
        }

        return kycOrganization.addValues(values)
          .then(() => kycOrganization.submit())
          .then(callback)
      }),
})

export const DirectorForm = connect(mapState, mapDispatch)(DirectorFormComponent)
