import React from 'react'
import cc from 'classcat'
import arrayMutators from 'final-form-arrays'
import grid from '@jibrelcom/ui/src/Grid/grid.scss'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  FieldArray,
  FieldArrayProps,
} from 'react-final-form-arrays'

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
  DirectorsValues,
  KYCInstitutionValues,
} from 'store/types/kyc'

import style from '../style.scss'
import { DirectorFields } from './DirectorFields'

interface StateProps {
  values: KYCInstitutionValues;
}

interface DispatchProps {
  submit: (callback: () => void) => (values: KYCInstitutionValues) =>
    Promise<KYCInstitutionValues> | void;
}

interface OwnProps {
  backHandler: () => void;
  nextHandler: () => void;
  backLabel: string;
  nextLabel: string;
}

export type DirectorProps = StateProps & DispatchProps & OwnProps

export const Director: React.FunctionComponent<DirectorProps> = ({
  submit,
  backHandler,
  nextHandler,
  values,
  backLabel,
  nextLabel,
}) => {
  const i18n = useI18n()

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
          initialValues={values}
          mutators={{...arrayMutators}}
          onSubmit={submit(nextHandler)}
          render={({
            handleSubmit,
            submitError,
            values: { directors },
            form: {
              mutators: {
                push,
              },
            },
          }: FormRenderProps): React.ReactNode => (
            <form onSubmit={handleSubmit}>
              <div className={style.step}>
                <h2 className={style.title}>
                  {i18n._('KYC.Company.director.form.title')}
                </h2>
                <div className={style.caption}>
                  {i18n._('KYC.Company.director.form.description')}
                </div>
                <FieldArray name='directors' initialValue={directors}>
                  {({ fields }: FieldArrayProps<DirectorsValues, HTMLElement>): React.ReactNode =>
                    fields.map((name: string, index: number) => (
                      <DirectorFields
                        key={name}
                        deleteHandler={(): void => fields.remove(index)}
                        index={index}
                        isPrimary={index === 0}
                      />
                    ))
                  }
                </FieldArray>
                <LinkButton
                  onClick={(): void => push('directors', undefined)}
                  className={style.addLink}
                  type='button'
                  id='t_addDirectorButton'
                >
                  {i18n._('KYC.Company.director.form.button.add')}
                </LinkButton>
                {submitError && <div className={style.submitError}>{submitError}</div>}
              </div>
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
    values: state.kycOrganization.values,
  }),
  (dispatch: Dispatch) => ({
    submit: (
      callback: () => void,
    ) => (
      values: KYCInstitutionValues,
    ): Promise<KYCInstitutionValues> | void => dispatch.kycOrganization
      .validate({ step: 4, ...values })
      .then(errors => {
        if (errors) {
          return errors
        }

        return dispatch.kycOrganization.addValues(values)
          .then(() => dispatch.kycOrganization.submit())
          .then(callback)
      }),
    uploadDocument: dispatch.kyc.uploadDocument,
  }),
)(Director)
