import reduce from 'lodash-es/reduce'
import isEmpty from 'lodash-es/isEmpty'

export const checkEmptyFields = (values) =>
    reduce(values, (errors, value, field) => isEmpty(value)
        ? {...errors, [field]: 'Field value is required'}
        : errors
        , {})
