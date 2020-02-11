import React from 'react'
import get from 'lodash-es/get'
import { useI18n } from '@jibrelcom/i18n'

import {
  Icon,
  Input,
  FileInput,
  PhoneNumberInput,
  HistoricDateInput,
} from '@jibrelcom/ui'

import CountrySelect from 'components/CountrySelect'
import isRequired from 'utils/validators/isRequired'

import {
  Documents,
  UploadDocumentHandler,
} from 'store/types/kyc'

import style from '../style.scss'

interface BeneficiaryFieldsProps {
  deleteHandler: () => void;
  uploadDocument: UploadDocumentHandler;
  documents: Documents;
  index?: number;
  isPrimary: boolean;
}

const emptyFileField = {
  error: '',
  fileName: '',
  fileSize: 0,
  isLoading: false,
}

export const BeneficiaryFields: React.FunctionComponent<BeneficiaryFieldsProps>  = ({
  deleteHandler,
  uploadDocument,
  documents,
  index = 0,
  isPrimary,
}) => {
  const i18n = useI18n()

  return  (
    <section>
      {!isPrimary &&
        <div className={style.additionalTitle}>
          <h2 className={style.title}>
            {i18n._('KYC.Company.beneficiary.form.indexTitle', { index: index + 1 })}
          </h2>
          <button
            onClick={deleteHandler}
            className={style.close}
            type='button'
          >
            <Icon name='ic_close_24' />
          </button>
        </div>
      }
      <h3 className={style.groupTitle}>
        {i18n._('KYC.Company.beneficiary.form.personalGroupTitle')}
      </h3>
      <Input
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].firstName`}
        label={i18n._('KYC.Company.beneficiary.form.firstName.label')}
      />
      <Input
        name={`beneficiaries[${index}].middleName`}
        label={i18n._('KYC.Company.beneficiary.form.middleName.label')}
      />
      <Input
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].lastName`}
        label={i18n._('KYC.Company.beneficiary.form.lastName.label')}
      />
      <HistoricDateInput
        name={`beneficiaries[${index}].birthDate`}
        label={i18n._('KYC.Company.beneficiary.form.birthDate.label')}
        validate={isRequired({ i18n })}
      />
      <CountrySelect
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].nationality`}
        label={i18n._('KYC.Company.beneficiary.form.nationality.label')}
        placeholder={i18n._('KYC.Company.beneficiary.form.nationality.placeholder')}
      />
      <h3 className={style.groupTitle}>
        {i18n._('KYC.Company.beneficiary.form.personalGroupTitle')}
      </h3>
      <PhoneNumberInput
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].phoneNumber`}
      />
      <Input
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].email`}
        label={i18n._('KYC.Company.beneficiary.form.email.label')}
      />
      <Input
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].streetAddress`}
        label={i18n._('KYC.Company.beneficiary.form.streetAddress.label')}
      />
      <Input
        name={`beneficiaries[${index}].apartment`}
        label={i18n._('KYC.Company.beneficiary.form.apartment.label')}
      />
      <Input
        name={`beneficiaries[${index}].city`}
        label={i18n._('KYC.Company.beneficiary.form.city.label')}
      />
      <Input
        name={`beneficiaries[${index}].postCode`}
        label={i18n._('KYC.Company.beneficiary.form.postCode.label')}
      />
      <CountrySelect
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].country`}
        label={i18n._('KYC.Company.beneficiary.form.country.label')}
        placeholder={i18n._('KYC.Company.beneficiary.form.country.placeholder')}
      />
      <FileInput
        onUpload={uploadDocument}
        validate={isRequired({ i18n })}
        placeholder={i18n._('KYC.document.placeholder')}
        name={`beneficiaries[${index}].proofOfAddressDocument`}
        label={i18n._('KYC.Company.beneficiary.form.proofOfAddressDocument.label')}
        {...(get(documents, `beneficiaries[${index}].proofOfAddressDocument`,  emptyFileField))}
      />
      <h3 className={style.groupTitle}>
        {i18n._('KYC.Company.beneficiary.form.passportGroupTitle')}
      </h3>
      <Input
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].passportNumber`}
        label={i18n._('KYC.Company.beneficiary.form.passportNumber.label')}
      />
      <HistoricDateInput
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].passportExpirationDate`}
        label={i18n._('KYC.Company.beneficiary.form.passportExpirationDate.label')}
      />
      <FileInput
        onUpload={uploadDocument}
        validate={isRequired({ i18n })}
        placeholder={i18n._('KYC.document.placeholder')}
        name={`beneficiaries[${index}].passportDocument`}
        label={i18n._('KYC.Company.beneficiary.form.passportDocument.label')}
        {...(get(documents, `beneficiaries[${index}].passportDocument`,  emptyFileField))}
      />
    </section>
  )
}
