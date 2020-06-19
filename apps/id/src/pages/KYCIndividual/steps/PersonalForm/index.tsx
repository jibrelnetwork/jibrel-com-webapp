import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
import { FormRenderProps } from 'react-final-form'
import { column } from '@jibrelcom/ui/src/Grid/grid.scss'

import {
  Input,
  FileInput,
  HistoricDateInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import CountrySelect from 'components/CountrySelect'
import isRequired from 'utils/validators/isRequired'

import {
  KYCIndividualValues,
  UploadDocumentHandler,
} from 'store/types/kyc'

import style from '../../style.scss'

export interface PersonalFormProps {
  uploadDocument: UploadDocumentHandler;
  formProps: FormRenderProps<KYCIndividualValues>;
}

const PersonalForm: React.FunctionComponent<PersonalFormProps> = ({
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
          {i18n._('KYC.Personal.personal.form.title')}
        </h2>
        <Input
          validate={isRequired({ i18n })}
          label={i18n._('KYC.Personal.personal.form.firstName.label')}
          name='firstName'
          id='__firstName'
        />
        <Input
          validate={isRequired({ i18n })}
          label={i18n._('KYC.Personal.personal.form.lastName.label')}
          name='lastName'
          id='__lastName'
        />
        <Input
          label={i18n._('KYC.Personal.personal.form.middleName.label')}
          name='middleName'
          id='__middleName'
        />
        <Input
          label={i18n._('KYC.Personal.personal.form.alias.label')}
          name='alias'
          id='__alias'
        />
        <HistoricDateInput
          validate={isRequired({ i18n })}
          hint={i18n._('form.date.hint')}
          label={i18n._('KYC.Personal.personal.form.birthDate.label')}
          name='birthDate'
          id='__birthDate'
        />
        <CountrySelect
          validate={isRequired({ i18n })}
          label={i18n._('KYC.Personal.personal.form.nationality.label')}
          placeholder={i18n._('KYC.Personal.personal.form.nationality.placeholder')}
          name='nationality'
          id='__nationality'
        />
        <h3 className={style.groupTitle}>
          {i18n._('KYC.Personal.personal.form.passportGroupTitle')}
        </h3>
        <Input
          validate={isRequired({ i18n })}
          label={i18n._('KYC.Personal.personal.form.passportNumber.label')}
          name='passportNumber'
          id='__passportNumber'
        />
        <HistoricDateInput
          validate={isRequired({ i18n })}
          hint={i18n._('form.date.hint')}
          label={i18n._('KYC.Personal.personal.form.passportExpirationDate.label')}
          name='passportExpirationDate'
          id='__passportExpirationDate'
        />
        <FileInput
          onUpload={uploadDocument}
          validate={isRequired({ i18n })}
          placeholder={i18n._('KYC.document.placeholder')}
          label={i18n._('KYC.Personal.personal.form.passportDocument.label')}
          name='passportDocument'
          id='__passportDocument'
        />
      </div>
      <BigButtonSubmit className={style.submit}
        id='__nextButton'
      >
        {i18n._('KYC.form.action.next')}
      </BigButtonSubmit>
    </form>
  )
}

export default PersonalForm
