import { FieldMetaState } from 'react-final-form'

export enum FormValidateType {
  touched = 'touched',
  visited = 'visited',
  dirtySinceLastSubmit = 'dirtySinceLastSubmit',
}

function checkMetaValidateType(
  meta: FieldMetaState<string | number | boolean>,
  validateType: FormValidateType,
): boolean {
  return !!validateType && !!meta[validateType]
}

export default function getErrorMessage(
  meta: FieldMetaState<string | number | boolean>,
  validateType: FormValidateType,
  hasErrorsWhileSubmitting: boolean = false,
): string | null {
  if (!hasErrorsWhileSubmitting && !!meta.submitting) {
    return null
  }

  const error: string | null = meta.error || meta.submitError

  const isDirtySinceLastSubmit: boolean = checkMetaValidateType(
    meta,
    FormValidateType.dirtySinceLastSubmit,
  )

  const isTouched: boolean = (validateType === FormValidateType.touched) && checkMetaValidateType(
    meta,
    FormValidateType.touched,
  )

  const isVisited: boolean = (validateType === FormValidateType.visited) && checkMetaValidateType(
    meta,
    FormValidateType.visited,
  )

  const isDirtyType: boolean = (validateType === FormValidateType.dirtySinceLastSubmit)
  const isDirty: boolean = isDirtyType && !isDirtySinceLastSubmit

  if (isDirty || isTouched || isVisited) {
    return error
  }

  return null
}