import React from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { FormRenderProps } from 'react-final-form'

import {
  Input,
  BigButton,
  FileInput,
} from '@jibrelcom/ui'

import CountrySelect from 'components/CountrySelect'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import { useI18n } from 'app/i18n'

import {
  Documents,
  KYCIndividualValues,
  UploadDocumentHandler,
} from 'store/types/kyc'

import {
  Dispatch,
  RootState,
} from 'store'

import style from '../../style.scss'

export interface PersonalFormProps {
  uploadDocument: UploadDocumentHandler;
  form: FormRenderProps<KYCIndividualValues>;
  documents: Documents;
}

const PersonalForm: React.FunctionComponent<PersonalFormProps> = ({
  uploadDocument,
  form,
  documents,
}) => {
  const i18n = useI18n()

  const handlePassportChange = async (file: File | void): Promise<void> => {
    const fieldName = 'passportDocument'
    const id = await uploadDocument({ file, fieldName })

    if (id) {
      form.form.change(fieldName, id)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit}
      className={cc([grid.column, style.form])}
    >
      <Input
        label={i18n._('KYC.Personal.input.firstName.title')}
        name='firstName'
      />
      <Input
        label={i18n._('KYC.Personal.input.lastName.title')}
        name='lastName'
      />
      <Input
        label={i18n._('KYC.Personal.input.middleName.title')}
        name='middleName'
      />
      <Input
        label={i18n._('KYC.Personal.input.alias.title')}
        name='alias'
      />
      <Input
        label={i18n._('KYC.Personal.input.birthDate.title')}
        name='birthDate'
        placeholder='DD/MM/YYYY'
      />
      <CountrySelect
        label={i18n._('KYC.Personal.input.nationality.title')}
        name='nationality'
        placeholder={i18n._('KYC.Personal.input.nationality.placeholder')}
      />
      <h3 className={style.groupTitle}>
        {i18n._('KYC.Personal.section.passport.title')}
      </h3>
      <Input
        label={i18n._('KYC.Personal.input.passportNumber.title')}
        name='passportNumber'
      />
      <Input
        label={i18n._('KYC.Personal.input.passportExpirationDate.title')}
        placeholder='DD/MM/YYYY'
        name='passportExpirationDate'
      />
      <FileInput
        onFileChange={handlePassportChange}
        label={i18n._('KYC.Personal.input.passportFrontPage.title')}
        name='passportDocument'
        placeholder='PNG, PDF, JPG'
        {...(documents.passportDocument || {})}
      />
      <BigButton
        type='submit'
        className={style.submit}
      >
        {i18n._('KYC.form.action.next')}
      </BigButton>
    </form>
  )
}

export default connect(
  (state: RootState) => ({
    documents: state.kyc.documents,
  }),
  (dispatch: Dispatch) => ({
    uploadDocument: dispatch.kyc.uploadDocument,
  }),
)(PersonalForm)
