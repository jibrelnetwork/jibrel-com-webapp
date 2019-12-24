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

    directors: [{
        fullName: '',
    }],

    isAgreedDocuments: false,
}

export const kycOrganization = createModel({
    state: {
        values: initialFormValues,
    },
    effects: () => ({
        submit: async (_, { kycOrganization }) => axios.post('/v1/kyc/organization', kycOrganization.values),
    }),
    reducers: {
        addValues: (state, values) => ({ ...state, values: {...state.values, ...values } }),
    },
})
