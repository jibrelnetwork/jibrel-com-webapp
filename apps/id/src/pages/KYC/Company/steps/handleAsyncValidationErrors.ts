import get from 'lodash-es/get'
import reduce from 'lodash-es/reduce'
import map from 'lodash-es/map'
import isString from 'lodash-es/isString'
import mapValues from 'lodash-es/mapValues'
import merge from 'lodash-es/merge'
import join from 'lodash-es/join'
import every from 'lodash-es/every'
import {FORM_ERROR} from 'final-form'

/* Backend response with validation errors examples:

const flat = {
    'valid': false,
    'errors': {
        'firstName': ['This field is required'],
    },
}

const nested = {
    'valid': false,
    'errors': {
        'beneficiaries': [{
            'phoneNumber': ['Invalid phone number format: zcf'],
            'birthDate': ['Date has wrong format. Use one of these formats instead: YYYY-MM-DD.'],
            'email': ['Enter a valid email address.'],
            'passportExpirationDate': ['Date has wrong format. Use one of these formats instead: YYYY-MM-DD.'],
        }],
    },
}

Algo:
Iterating over errors by their key and value.
If we find a string (array of strings) among values - returning simple { key: value } error record
If we find an object among values at certain position -
    Iterate over object subkeys and subvalues
    For each subkey return new { key[position].subkey: subvalue }

 */

const isArrayOfStrings = (array: []) => every(array, isString)

export const handleAsyncValidationErrors = (payload) => {
    const status = get(payload, 'response.status', 500)
    if (status === 400) {
        const fieldsWithErrors = get(payload, 'response.data.data.errors')

        return reduce(fieldsWithErrors, (validationErrors, errors, field) => {
            if (isArrayOfStrings(errors)) {

                // Root-level field errors
                return merge(validationErrors, {[field]: join(errors)})
            } else {

                // Subfields errors
                const subfieldsErrors = map(errors, (e) => mapValues(e, join))
                return merge(validationErrors, {[field]: subfieldsErrors})
            }
        }, {})
    } else {
        return {
            [FORM_ERROR]: 'There vas an error during form submission',
        }
    }
}
