import React from 'react'
import cc from 'classcat'
import grid from '@jibrelcom/ui/src/Grid/grid.scss'
import {useI18n} from 'app/i18n'
import {Form} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {FieldArray} from 'react-final-form-arrays'
import {connect} from 'react-redux'

import {
    BigButtonSubmit,
    LinkButton,
    Checkbox,
} from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'
import isRequired from 'utils/validators/isRequired'
import settings from 'app/settings'

import {FormProps} from '../FormProps'
import style from '../style.scss'

import {DirectorFields} from './DirectorFields'


const initialDocuments = ['']

export const DirectorFormComponent: React.FunctionComponent<FormProps> = ({backLabel, backHandler, nextLabel, nextHandler, submit}) => {
    const i18n = useI18n()
    const initialValues = {}

    return (
        <KYCLayout
            title={i18n._('KYC.Company.section.director.title')}
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
                initialValues={initialValues}
                mutators={{...arrayMutators}}
                onSubmit={submit(nextHandler)}
                render={({
                             handleSubmit,
                             submitError,
                             form: {
                                 mutators: {push},
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

                        <Checkbox
                            name='isAgreedDocuments'
                            validate={isRequired({i18n})}
                        >
                            {/* FIXME: list of documents differs from figma*/}
                            {/*<span>*/}
                            {/*  I agree to Jibrel’s <a*/}
                            {/*    href={`${settings.HOST_CMS}/docs/en/risk-disclosures.pdf`}*/}
                            {/*    target='_blank'*/}
                            {/*>Terms and Conditions</a>, <a*/}
                            {/*    href={`${settings.HOST_CMS}/docs/en/risk-disclosures.pdf`}*/}
                            {/*    target='_blank'*/}
                            {/*>Privacy Policy</a> and <a*/}
                            {/*    href={`${settings.HOST_CMS}/docs/en/risk-disclosures.pdf`}*/}
                            {/*    target='_blank'*/}
                            {/*>*/}
                            {/*    Risk Disclosures*/}
                            {/*  </a>.*/}
                            {/*</span>*/}

                            <span>
                              I agree to Jibrel’s <a
                                href={`${settings.HOST_CMS}/docs/en/risk-disclosures.pdf`}
                                target='_blank'
                            >
                                Risk Disclosures
                              </a>.
                            </span>
                        </Checkbox>

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
