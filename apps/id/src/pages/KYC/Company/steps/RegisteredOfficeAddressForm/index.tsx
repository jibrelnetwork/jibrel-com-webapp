import React from 'react'
import cc from 'classcat'
import grid from '@jibrelcom/ui/src/Grid/grid.scss'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

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

const CHECKBOX_NAME = 'haveCompanyAddressPrincipal'
const PRINCIPAL_ADDRESS_NAME = 'companyAddressPrincipal'

function handleCheckboxChange(
  change: (name: string, value: void | boolean) => void,
  oldValue: boolean,
): () => void {
  return (): void => {
    change(CHECKBOX_NAME, !oldValue)

    if (oldValue) {
      change(PRINCIPAL_ADDRESS_NAME, undefined)
    }
  }
}

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
            form,
            values,
            submitError,
          }: FormRenderProps): React.ReactNode => {
            const haveCompanyAddressPrincipal = values[CHECKBOX_NAME]

            return (
              <form onSubmit={handleSubmit}>
                <div className={style.step}>
                  <h2 className={style.title}>
                    {i18n._('KYC.Company.address.form.title')}
                  </h2>
                  <Input
                    validate={isRequired({i18n})}
                    label={i18n._('KYC.Company.address.form.streetAddress.label')}
                    name='companyAddressRegistered.streetAddress'
                    maxLength={256}
                    id='__streetAddress'
                  />
                  <Input
                    label={i18n._('KYC.Company.address.form.apartment.label')}
                    name='companyAddressRegistered.apartment'
                    id='__apartment'
                  />
                  <Input
                    validate={isRequired({i18n})}
                    label={i18n._('KYC.Company.address.form.city.label')}
                    name='companyAddressRegistered.city'
                    maxLength={256}
                    id='__city'
                  />
                  <Input
                    label={i18n._('KYC.Company.address.form.postCode.label')}
                    name='companyAddressRegistered.postCode'
                    maxLength={256}
                    id='__postCode'
                  />
                  <CountrySelect
                    validate={isRequired({i18n})}
                    label={i18n._('KYC.Company.address.form.country.label')}
                    placeholder={i18n._('KYC.Company.address.form.country.placeholder')}
                    name='companyAddressRegistered.country'
                    id='__country'
                  />
                  <Checkbox
                    onChange={handleCheckboxChange(form.change, haveCompanyAddressPrincipal)}
                    name={CHECKBOX_NAME}
                    id='__checkbox'
                  >
                    {i18n._('KYC.Company.address.form.differentAddress')}
                  </Checkbox>
                  {haveCompanyAddressPrincipal && (
                    <section>
                      <h2 className={style.subtitle}>
                        {i18n._('KYC.Company.address.form.placeGroupTitle')}
                      </h2>
                      <Input
                        validate={isRequired({i18n})}
                        name={`${PRINCIPAL_ADDRESS_NAME}.streetAddress`}
                        label={i18n._('KYC.Company.address.form.streetAddress.label')}
                        maxLength={256}
                        id='__streetAddress2'
                      />
                      <Input
                        name={`${PRINCIPAL_ADDRESS_NAME}.apartment`}
                        label={i18n._('KYC.Company.address.form.apartment.label')}
                        maxLength={256}
                        id='__apartment2'
                      />
                      <Input
                        validate={isRequired({i18n})}
                        name={`${PRINCIPAL_ADDRESS_NAME}.city`}
                        label={i18n._('KYC.Company.address.form.city.label')}
                        maxLength={256}
                        id='__city2'
                      />
                      <Input
                        name={`${PRINCIPAL_ADDRESS_NAME}.postCode`}
                        label={i18n._('KYC.Company.address.form.postCode.label')}
                        maxLength={256}
                        id='__postCode2'
                      />
                      <CountrySelect
                        id='__countrySelect2'
                        validate={isRequired({i18n})}
                        name={`${PRINCIPAL_ADDRESS_NAME}.country`}
                        label={i18n._('KYC.Company.address.form.country.label')}
                        placeholder={i18n._('KYC.Company.address.form.country.placeholder')}
                      />
                    </section>
                  )}
                  {submitError && <div className={style.submitError}>{submitError}</div>}
                </div>
                <BigButtonSubmit className={style.submit}
                  id='__nextButton'
                >
                  {nextLabel}
                </BigButtonSubmit>
              </form>
            )
          }}
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
