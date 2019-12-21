import React from 'react'
import {useI18n} from 'app/i18n'
import {Form} from 'react-final-form'

import {
    BigButtonSubmit,
    LinkButton,
} from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'
import {FormProps} from '../FormProps'
import arrayMutators from 'final-form-arrays'
import style from './style.scss'
import {FieldArray} from 'react-final-form-arrays'
import {DirectorFields} from './DirectorFields'
import {handleAsyncValidationErrors} from '../handleAsyncValidationErrors'
import {connect} from 'react-redux'


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
                             form: {
                                 mutators: {push}
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
                                        isPrimary={index===0}
                                        key={name}
                                        index={index}
                                        deleteHandler={() => fields.remove(index)}
                                    />
                                ))
                            }
                        </FieldArray>

                        <LinkButton type="button" onClick={() => push('directors', undefined)}>
                            + ADD MORE DIRECTORS
                        </LinkButton>

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

const mapDispatch = ({kycOrganizationValidate}) => ({
    submit: (callback) => (values) =>
        kycOrganizationValidate.validate({step: 4, ...values})
            .then(callback)
            .catch(handleAsyncValidationErrors),
})

export const DirectorForm = connect(mapState, mapDispatch)(DirectorFormComponent)
