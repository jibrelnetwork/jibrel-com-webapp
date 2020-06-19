import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
import { FormRenderProps } from 'react-final-form'
import { column } from '@jibrelcom/ui/src/Grid/grid.scss'

import {
  Input,
  FileInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import CountrySelect from 'components/CountrySelect'
import isRequired from 'utils/validators/isRequired'

import {
  KYCIndividualValues,
  UploadDocumentHandler,
} from 'store/types/kyc'

import style from '../../style.scss'

export interface ResidencyFormProps {
  uploadDocument: UploadDocumentHandler;
  formProps: FormRenderProps<KYCIndividualValues>;
}

const ResidencyForm: React.FunctionComponent<ResidencyFormProps> = ({
  uploadDocument,
  formProps,
}) => {
  const i18n = useI18n()

  return (
    <form
      onSubmit={formProps.handleSubmit}
      className={column}
    >
      <div className={style.form}>
        <h2 className={style.title}>
          {i18n._('KYC.Personal.residency.form.title')}
        </h2>
        <Input
          validate={isRequired({ i18n })}
          label={i18n._('KYC.Personal.residency.form.streetAddress.label')}
          name='streetAddress'
          id='__streetAddress'
        />
        <Input
          label={i18n._('KYC.Personal.residency.form.apartment.label')}
          name='apartment'
          id='__apartment'
        />
        <Input
          validate={isRequired({ i18n })}
          label={i18n._('KYC.Personal.residency.form.city.label')}
          name='city'
          id='__city'
        />
        <Input
          label={i18n._('KYC.Personal.residency.form.postCode.label')}
          name='postCode'
          id='_postCode'
        />
        <CountrySelect
          validate={isRequired({ i18n })}
          label={i18n._('KYC.Personal.residency.form.country.label')}
          placeholder={i18n._('KYC.Personal.residency.form.country.placeholder')}
          name='country'
          id='__country'
        />
        <FileInput
          validate={isRequired({ i18n })}
          onUpload={uploadDocument}
          placeholder={i18n._('KYC.document.placeholder')}
          label={i18n._('KYC.Personal.residency.form.proofOfAddressDocument.label')}
          name='proofOfAddressDocument'
          id='__proofOfAddressDocument'
        />
      </div>
      <BigButtonSubmit className={style.submit}
        id='nextButton'
      >
        {i18n._('KYC.form.action.next')}
      </BigButtonSubmit>
    </form>
  )
}

export default ResidencyForm
