import React from 'react'
import cc from 'classcat'
import { FormRenderProps } from 'react-final-form'

import {
  Input,
  FileInput,
  BigButton,
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

export interface ResidencyFormProps {
  uploadDocument: UploadDocumentHandler;
  formProps: FormRenderProps<KYCIndividualValues>;
  documents: Documents;
}

const ResidencyForm: React.FunctionComponent<ResidencyFormProps> = ({
  uploadDocument,
  formProps,
  documents,
}) => {
  const i18n = useI18n()

  const handlePassportChange = async (file: File | void): Promise<void> => {
    await uploadDocument({ file, fieldName: 'proofOfAddressDocument' })
  }

  return (
    <form
      onSubmit={formProps.handleSubmit}
      className={cc([grid.column, style.form])}
    >
      <Input
        validate={isRequired({ i18n })}
        name='streetAddress'
        label='Street Address'
      />
      <Input
        validate={isRequired({ i18n })}
        name='apartment'
        label='Apartment, Unit or Suite (Optional)'
      />
      <Input
        validate={isRequired({ i18n })}
        name='city'
        label='City'
      />
      <Input
        validate={isRequired({ i18n })}
        name='postCode'
        label='Post Code (Optional)'
      />
      <CountrySelect
        validate={isRequired({ i18n })}
        name='country'
        label='Country'
        placeholder='select country'
      />
      <FileInput
        validate={isRequired({ i18n })}
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

export default ResidencyForm
