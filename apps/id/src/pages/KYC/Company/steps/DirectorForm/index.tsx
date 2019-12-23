import React from 'react'
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
import {handleAsyncValidationErrors} from '../handleAsyncValidationErrors'

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
                            name='terms'
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
        </KYCLayout>
    )
}

const mapState = ({kycOrganization}) => ({
    formValues: kycOrganization.values,
})

const mapDispatch = ({kycOrganizationValidate, kycOrganization}) => ({
    submit: (callback) => (values) =>
        kycOrganizationValidate
            .validate({step: 4, ...values, amlAgreed: values.terms, uboConfirmed: values.terms})
            .then(() => kycOrganization.addValues({...values, amlAgreed: values.terms, uboConfirmed: values.terms}))
            .then(kycOrganization.submit)
            .then(callback)
            .catch(handleAsyncValidationErrors),
})

export const DirectorForm = connect(mapState, mapDispatch)(DirectorFormComponent)
