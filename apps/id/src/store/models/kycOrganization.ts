import {createModel} from '@rematch/core'
import { FORM_ERROR } from 'final-form'
import { API_FORM_ERROR } from '@jibrelcom/forms'

import axios from '../axios'

const initialFormValues = {
    companyName: '',
    tradingName: '',
    dateOfIncorporation: '',
    placeOfIncorporation: '',

    commercialRegister: '',
    shareholderRegister: '',
    articlesOfIncorporation: '',

    companyAddressRegistered: {
        streetAddress: '',
        apartment: '',
        city: '',
        postCode: '',
        country: '',
    },

    beneficiaries: [
        {
            firstName: '',
            middleName: '',
            lastName: '',
            birthDate: '',
            nationality: '',
            email: '',
            phoneNumber: {
                number: '',
                status: '',
            },
            streetAddress: '',
            apartment: '',
            city: '',
            postCode: '',
            country: '',
            passportNumber: '',
            passportExpirationDate: '',
            passportDocument: '',
            proofOfAddressDocument: '',
        },
    ],

    directors: [{
        fullName: '',
    }],
}

const BENEFICIARIES_STEP = 3
const DIRECTORS_STEP = 4

const getFormArrayErrors = (errors, key) => {
  if (!errors[key]) {
    return errors
  }

  return {
    [key]: errors[key].map(item => {
      return Object.keys(item).reduce((itemResult, itemKey) => {
        const keyError = item[itemKey][0]
        itemResult[itemKey] = (typeof keyError === 'string') ? keyError : keyError.message

        return itemResult
      }, {})
    })
  }
}

const getFormErrors = (error, key) => {
  if (!(error.response.data && error.response.data.errors)) {
    return undefined
  }

  const apiErrors = error.response.data.errors

  if (apiErrors[API_FORM_ERROR]) {
    const formError = apiErrors[API_FORM_ERROR][0]

    return {
      [FORM_ERROR]: (typeof formError === 'string')
        ? formError
        : formError.message
    }
  }

  return getFormArrayErrors(apiErrors, key)
}

export const kycOrganization = createModel({
    state: {
        values: initialFormValues,
    },
    effects: () => ({
        submit: async (_, { kycOrganization }) => axios.post('/v1/kyc/organization', kycOrganization.values),
        async validate (values) {
          try {
            await axios.post('/v1/kyc/organization/validate', values)
          } catch (error) {
            if (!error.response) {
              throw error
            }

            const { status } = error.response

            if (status === 400) {
              if (BENEFICIARIES_STEP === values.step) {
                return getFormErrors(error, 'beneficiaries')
              } else if (DIRECTORS_STEP === values.step) {
                return getFormErrors(error, 'directors')
              }

              console.log(error.formValidation)

              return error.formValidation
            }

            if (status === 409) {
              window.location.reload()
            }

            throw error
          }
        },
    }),
    reducers: {
        addValues: (state, values) => ({ ...state, values: {...state.values, ...values } }),
    },
})
