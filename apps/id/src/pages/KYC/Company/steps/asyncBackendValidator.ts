import get from 'lodash-es/get'
import mapValues from 'lodash-es/mapValues'
import join from 'lodash-es/join'
import {FORM_ERROR} from 'final-form'


export const asyncBackendValidator = (payload) => {
    const status = get(payload, 'response.status', 500)
    if (status === 400) {
        const errors = get(payload, 'response.data.data.errors')
        return mapValues(errors, (errors) => join(errors, '; '))
    } else {
        return {
            [FORM_ERROR]: 'There vas an error during form step submission'
        }
    }
}
