import {createModel} from '@rematch/core'

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

    companyAddressPrincipal: {
        streetAddress: '',
        apartment: '',
        city: '',
        postCode: '',
        country: '',
    },

    beneficiaries: [
        {
            fullName: '',
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

    directors: [
        '',
    ],
}

export const kycOrganization = createModel({
    state: {
        values: initialFormValues,
    },
    effects: ({kycOrganization}) => ({

        addValues: (payload) =>
            this.setValues({
                ...kycOrganization.values,
                ...payload,
            }),

        submit: async () => axios.post('/v1/kyc/organization', kycOrganization.values),
    }),
    reducers: {
        setValues: (state, values) => ({ ...state, values }),
    },
})
