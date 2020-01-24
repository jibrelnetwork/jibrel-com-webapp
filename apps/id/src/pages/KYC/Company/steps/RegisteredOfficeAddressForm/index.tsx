import React from 'react'
import cc from 'classcat'
import grid from '@jibrelcom/ui/src/Grid/grid.scss'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'
import { useI18n } from '@jibrelcom/i18n'

import {
  Input,
  Checkbox,
  BigButtonSubmit,
  } from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'
import isRequired from 'utils/validators/isRequired'
import CountrySelect from 'components/CountrySelect'

import style from '../style.scss'
import { FormProps } from '../FormProps'

export const RegisteredOfficeAddressFormComponent: React.FunctionComponent<FormProps> = ({
  submit,
  backHandler,
  nextHandler,
  formValues,
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
          style.address,
          style.background,
        ])}
      >
      <Form
        initialValues={formValues}
        onSubmit={submit(nextHandler)}
        render={({
          handleSubmit,
          submitError,
          values: {
            haveCompanyAddressPrincipal,
          },
        }) => (
          <form onSubmit={handleSubmit} className={style.step}>
            <h2 className={style.title}>
              Registered Office Address
            </h2>
            <Input
              name='companyAddressRegistered.streetAddress'
              label={'Street Address'}
              validate={isRequired({i18n})}
            />
            <Input
              name='companyAddressRegistered.apartment'
              label={'Unit or Suite (Optional)'}
            />
            <Input
              name='companyAddressRegistered.city'
              label={'City'}
              validate={isRequired({i18n})}
            />
            <Input
              name='companyAddressRegistered.postCode'
              label={'Post Code (Optional)'}
            />
            <CountrySelect
              name='companyAddressRegistered.country'
              label={'Country'}
              validate={isRequired({i18n})}
              placeholder='select country'
            />

            <Checkbox name='haveCompanyAddressPrincipal'>
              {'Principal place of business different from registered address'}
            </Checkbox>

            { haveCompanyAddressPrincipal && (
              <section>
                <h2 className={style.subtitle}>
                  Principal Place of Business
                </h2>
                <Input
                  name='companyAddressPrincipal.streetAddress'
                  label={'Street Address'}
                  validate={isRequired({i18n})}
                />
                <Input
                  name='companyAddressPrincipal.apartment'
                  label={'Unit or Suite (Optional)'}
                />
                <Input
                  name='companyAddressPrincipal.city'
                  label={'City'}
                  validate={isRequired({i18n})}
                />
                <Input
                  name='companyAddressPrincipal.postCode'
                  label={'Post Code (Optional)'}
                />
                <CountrySelect
                  name='companyAddressPrincipal.country'
                  label={'Country'}
                  validate={isRequired({i18n})}
                  placeholder='select country'
                />
              </section>
            )}

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
      .validate({step: 1, ...values})
      .then(errors => {
        if (errors) {
          return errors
        }

        return kycOrganization.addValues(values).then(callback)
      }),
})

export const RegisteredOfficeAddressForm = connect(
  mapState,
  mapDispatch,
)(RegisteredOfficeAddressFormComponent)
