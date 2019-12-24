import React from 'react'
import cc from 'classcat'
import { FormRenderProps } from 'react-final-form'

import {
  Input,
  FileInput,
  HistoricDateInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import CountrySelect from 'components/CountrySelect'
import isRequired from 'utils/validators/isRequired'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import { useI18n } from 'app/i18n'

import {
  Documents,
  KYCIndividualValues,
  UploadDocumentHandler,
} from 'store/types/kyc'

import style from '../../style.scss'

export interface PersonalFormProps {
  uploadDocument: UploadDocumentHandler;
  documents: Documents;
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
      className={cc([grid.column, style.form])}
    >
      <h2 className={style.title}>
        {i18n._('KYC.Personal.section.personal.title')}
      </h2>
      <Input
        validate={isRequired({ i18n })}
        label={i18n._('KYC.Personal.input.firstName.title')}
        name='firstName'
      />
      <Input
        validate={isRequired({ i18n })}
        label={i18n._('KYC.Personal.input.lastName.title')}
        name='lastName'
      />
      <Input
        name='middleName'
        label='Middle Name (Optional)'
      />
      <Input
        name='alias'
        label='Alias (Optional)'
      />
      <HistoricDateInput
        validate={isRequired({ i18n })}
        label={i18n._('KYC.Personal.input.birthDate.title')}
        name='birthDate'
      />
      <CountrySelect
        validate={isRequired({ i18n })}
        label={i18n._('KYC.Personal.input.nationality.title')}
        name='nationality'
        placeholder={i18n._('KYC.Personal.input.nationality.placeholder')}
      />
      <h3 className={style.groupTitle}>
        {i18n._('KYC.Personal.section.passport.title')}
      </h3>
      <Input
        validate={isRequired({ i18n })}
        label={i18n._('KYC.Personal.input.passportNumber.title')}
        name='passportNumber'
      />
      <HistoricDateInput
        validate={isRequired({ i18n })}
        label={i18n._('KYC.Personal.input.passportExpirationDate.title')}
        name='passportExpirationDate'
      />
      <FileInput
        validate={isRequired({ i18n })}
        onUpload={uploadDocument}
        label={i18n._('KYC.Personal.input.passportFrontPage.title')}
        name='passportDocument'
        placeholder='PNG, PDF, JPG'
      />
      <BigButtonSubmit
        className={style.submit}
      >
        {i18n._('KYC.form.action.next')}
      </BigButtonSubmit>
    </form>
  )
}

export default PersonalForm
