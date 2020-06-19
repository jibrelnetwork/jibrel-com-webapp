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
        id={`__firstName[${index}]`}
      />
      <Input
        name={`beneficiaries[${index}].middleName`}
        label={i18n._('KYC.Company.beneficiary.form.middleName.label')}
        id={`__middleName[${index}]`}
      />
      <Input
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].lastName`}
        label={i18n._('KYC.Company.beneficiary.form.lastName.label')}
        id={`__lastName[${index}]`}
      />
      <HistoricDateInput
        validate={isRequired({ i18n })}
        hint={i18n._('form.date.hint')}
        name={`beneficiaries[${index}].birthDate`}
        label={i18n._('KYC.Company.beneficiary.form.birthDate.label')}
        id={`__birthDate[${index}]`}
      />
      <CountrySelect
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].nationality`}
        label={i18n._('KYC.Company.beneficiary.form.nationality.label')}
        placeholder={i18n._('KYC.Company.beneficiary.form.nationality.placeholder')}
        id={`__nationality[${index}]`}
      />
      <h3 className={style.groupTitle}>
        {i18n._('KYC.Company.beneficiary.form.personalGroupTitle')}
      </h3>
      <PhoneNumberInput
        validate={isRequired({ i18n })}
        hint={i18n._('form.phoneNumber.hint')}
        name={`beneficiaries[${index}].phoneNumber`}
        id={`__phoneNumber[${index}]`}
      />
      <Input
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].email`}
        label={i18n._('KYC.Company.beneficiary.form.email.label')}
        id={`__email[${index}]`}
      />
      <Input
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].streetAddress`}
        label={i18n._('KYC.Company.beneficiary.form.streetAddress.label')}
        id={`__streetAddress[${index}]`}
      />
      <Input
        name={`beneficiaries[${index}].apartment`}
        label={i18n._('KYC.Company.beneficiary.form.apartment.label')}
        id={`__apartment[${index}]`}
      />
      <Input
        name={`beneficiaries[${index}].city`}
        label={i18n._('KYC.Company.beneficiary.form.city.label')}
        id={`__city[${index}]`}
      />
      <Input
        name={`beneficiaries[${index}].postCode`}
        label={i18n._('KYC.Company.beneficiary.form.postCode.label')}
        id={`__postCode[${index}]`}
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
        id={`__proofOfAddress[${index}]`}
        {...(get(documents, `beneficiaries[${index}].proofOfAddressDocument`,  emptyFileField))}
      />
      <h3 className={style.groupTitle}>
        {i18n._('KYC.Company.beneficiary.form.passportGroupTitle')}
      </h3>
      <Input
        validate={isRequired({ i18n })}
        name={`beneficiaries[${index}].passportNumber`}
        label={i18n._('KYC.Company.beneficiary.form.passportNumber.label')}
        id={`__passportNumber[${index}]`}
      />
      <HistoricDateInput
        validate={isRequired({ i18n })}
        hint={i18n._('form.date.hint')}
        name={`beneficiaries[${index}].passportExpirationDate`}
        label={i18n._('KYC.Company.beneficiary.form.passportExpirationDate.label')}
        id={`__passportExpirationDate[${index}]`}
      />
      <FileInput
        onUpload={uploadDocument}
        validate={isRequired({ i18n })}
        placeholder={i18n._('KYC.document.placeholder')}
        name={`beneficiaries[${index}].passportDocument`}
        label={i18n._('KYC.Company.beneficiary.form.passportDocument.label')}
        id={`__passportDocument[${index}]`}
        {...(get(documents, `beneficiaries[${index}].passportDocument`,  emptyFileField))}
      />
    </section>
  )
}
