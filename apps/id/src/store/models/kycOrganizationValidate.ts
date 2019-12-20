import {createModel} from '@rematch/core'

import axios from '../axios'


export const kycOrganizationValidate = createModel({
    state: {
        isValid: null,
        errors: [],
    },
    effects: ({ kycOrganizationValidate }) => ({
        validate: async (values) => axios.post('/v1/kyc/organization/validate', values)
            .then(kycOrganizationValidate.success)
            .catch(kycOrganizationValidate.failure),
    }),
    reducers: {
        success: (state) => ({...state, isValid: true, errors: []}),
        failure: (state, errors) => ({...state, isValid: false, errors}),
    },
})
