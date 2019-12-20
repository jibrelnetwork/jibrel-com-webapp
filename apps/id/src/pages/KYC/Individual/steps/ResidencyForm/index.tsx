import React from 'react'
import { connect } from 'react-redux'
import { FormRenderProps } from 'react-final-form'

import {
  Input,
  BigButton,
  FileInput,
} from '@jibrelcom/ui'

import CountrySelect from 'components/CountrySelect'
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

export interface ResidencyFormProps {
  uploadDocument: UploadDocumentHandler;
  form: FormRenderProps<KYCIndividualValues>;
  documents: Documents;
}

const ResidencyForm: React.FunctionComponent<ResidencyFormProps> = ({
  uploadDocument,
  form,
  documents,
}) => {
  const i18n = useI18n()

  const handlePassportChange = async (file: File | void): Promise<void> => {
    const fieldName = 'proofOfAddressDocument'
    const id = await uploadDocument({ file, fieldName })

    if (id) {
      form.form.change(fieldName, id)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit}
      className={style.form}
    >
      <Input
        name='streetAddress'
        label='Street Address'
      />
      <Input
        name='apartment'
        label='Apartment, Unit or Suite (Optional)'
      />
      <Input
        name='city'
        label='City'
      />
      <Input
        name='postCode'
        label='Post Code (Optional)'
      />
      <CountrySelect
        name='country'
        label='Country'
        placeholder='select country'
      />
      <FileInput
        onFileChange={handlePassportChange}
        placeholder='PNG, PDF, JPG'
        name='proofOfAddressDocument'
        label='Proof of Address (Utility Bill, Bank Statements)'
        {...(documents.proofOfAddressDocument || {})}
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
)(ResidencyForm)
