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
          <form onSubmit={handleSubmit}>
            <div className={style.step}>
              <h2 className={style.title}>
                {i18n._('KYC.Company.address.form.title')}
              </h2>
              <Input
                validate={isRequired({i18n})}
                label={i18n._('KYC.Company.address.form.streetAddress.label')}
                name='companyAddressRegistered.streetAddress'
              />
              <Input
                label={i18n._('KYC.Company.address.form.apartment.label')}
                name='companyAddressRegistered.apartment'
              />
              <Input
                validate={isRequired({i18n})}
                label={i18n._('KYC.Company.address.form.city.label')}
                name='companyAddressRegistered.city'
              />
              <Input
                label={i18n._('KYC.Company.address.form.postCode.label')}
                name='companyAddressRegistered.postCode'
              />
              <CountrySelect
                validate={isRequired({i18n})}
                label={i18n._('KYC.Company.address.form.country.label')}
                placeholder={i18n._('KYC.Company.address.form.country.placeholder')}
                name='companyAddressRegistered.country'
              />
              <Checkbox name='haveCompanyAddressPrincipal'>
                {i18n._('KYC.Company.address.form.differentAddress')}
              </Checkbox>
              {haveCompanyAddressPrincipal && (
                <section>
                  <h2 className={style.subtitle}>
                    {i18n._('KYC.Company.address.form.placeGroupTitle')}
                  </h2>
                  <Input
                    validate={isRequired({i18n})}
                    label={i18n._('KYC.Company.address.form.streetAddress.label')}
                    name='companyAddressPrincipal.streetAddress'
                  />
                  <Input
                    label={i18n._('KYC.Company.address.form.apartment.label')}
                    name='companyAddressPrincipal.apartment'
                  />
                  <Input
                    validate={isRequired({i18n})}
                    label={i18n._('KYC.Company.address.form.city.label')}
                    name='companyAddressPrincipal.city'
                  />
                  <Input
                    label={i18n._('KYC.Company.address.form.postCode.label')}
                    name='companyAddressPrincipal.postCode'
                  />
                  <CountrySelect
                    validate={isRequired({i18n})}
                    label={i18n._('KYC.Company.address.form.country.label')}
                    placeholder={i18n._('KYC.Company.address.form.country.placeholder')}
                    name='companyAddressPrincipal.country'
                  />
                </section>
              )}
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


const mapState = ({ kycOrganization }) => ({
  formValues: kycOrganization.values,
})

const mapDispatch = ({ kycOrganization }) => ({
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
