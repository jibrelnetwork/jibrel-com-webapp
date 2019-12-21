import React from 'react'
import get from 'lodash-es/get'
import {
    Input,
    FileInput,
    Icon,
} from '@jibrelcom/ui'
import style from './style.scss'
import CountrySelect from 'components/CountrySelect'
import isRequired from 'utils/validators/isRequired'
import {useI18n} from 'app/i18n'


interface BeneficiaryFieldsProps {
    isPrimary: boolean;
    index?: number;
    deleteHandler: () => void;
    uploadDocument: () => void;
    documents: [];
}

const emptyFileField = {
    fileName: '',
    fileSize: 0,
    isLoading: false,
    error: ''
}

export const BeneficiaryFields: React.FunctionComponent<BeneficiaryFieldsProps>  = (props) => {
    const {isPrimary, index = 0, deleteHandler, uploadDocument, documents} = props
    const i18n = useI18n()
    return  (
        <section>
            {!isPrimary &&
            <div className={style.additionalTitle}>
              <h2 className={style.title}>Beneficiary {index+1}</h2>
              <Icon name='ic_close_24' onClick={deleteHandler}/>
            </div>
            }

            <h3 className={style.groupTitle}>Personal Information</h3>
            <Input
                name={`beneficiaries[${index}].fullName`}
                label="Full Legal Name"
                validate={isRequired({i18n})}
            />
            <Input
                name={`beneficiaries[${index}].birthDate`}
                label="Date of Birth"
                placeholder="DD/MM/YYYY"
                validate={isRequired({i18n})}
            />
            <CountrySelect
                name={`beneficiaries[${index}].nationality`}
                label={'Nationality'}
                validate={isRequired({i18n})}
                placeholder='select country'
            />


            <h3 className={style.groupTitle}>Current Residential Address</h3>
            <Input
                name={`beneficiaries[${index}].phoneNumber`}
                label="Primary Telephone (Optional)"
            />
            <Input
                name={`beneficiaries[${index}].email`}
                label="Email"
                validate={isRequired({i18n})}
            />
            <Input
                name={`beneficiaries[${index}].streetAddress`}
                label="Street Address"
                validate={isRequired({i18n})}
            />
            <Input
                name={`beneficiaries[${index}].apartment`}
                label="Apartment, Unit or Suite (Optional)"
            />
            <Input
                name={`beneficiaries[${index}].city`}
                label="City"
            />
            <Input
                name={`beneficiaries[${index}].postCode`}
                label="Post Code (Optional)"
            />
            <CountrySelect
                name={`beneficiaries[${index}].country`}
                label={'Country of Residence'}
                validate={isRequired({i18n})}
                placeholder='select country'
            />
            <FileInput
                name={`beneficiaries[${index}].proofOfAddressDocument`}
                label={'Proof of Address (Utility Bill, Bank Statements)'}
                placeholder={'PNG, PDF, JPG'}
                onFileChange={(file: File) => uploadDocument({file, fieldName: `beneficiaries[${index}].proofOfAddressDocument`})}
                {...(get(documents, `beneficiaries[${index}].proofOfAddressDocument`,  emptyFileField))}
                validate={isRequired({i18n})}
            />


            <h3 className={style.groupTitle}>Personal ID</h3>
            <Input
                name={`beneficiaries[${index}].passportNumber`}
                label="Passport Number"
                validate={isRequired({i18n})}
            />
            <Input
                name={`beneficiaries[${index}].passportExpirationDate`}
                label="Passport Expiration Date"
                placeholder="DD/MM/YYYY"
                validate={isRequired({i18n})}
            />
            <FileInput
                name={`beneficiaries[${index}].passportDocument`}
                label={'Passport Front Page'}
                placeholder={'PNG, PDF, JPG'}
                onFileChange={(file: File) => uploadDocument({file, fieldName: `beneficiaries[${index}].passportDocument`})}
                {...(get(documents, `beneficiaries[${index}].passportDocument`,  emptyFileField))}
                validate={isRequired({i18n})}
            />

        </section>
    )
}
