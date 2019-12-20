import {createModel} from '@rematch/core'

import axios from '../axios'


export const kycOrganizationValidate = createModel({
    state: {},
    effects: () => ({
        validate: async (values) => axios.post('/v1/kyc/organization/validate', values)
    })
})
