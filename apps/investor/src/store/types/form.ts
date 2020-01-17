import { FORM_ERROR } from 'final-form'

export type FormErrors<FormFields> = {
  [key in keyof FormFields & { [FORM_ERROR]: string }]?: string | void;
}

export type FormSubmitResult<FormFields> = Promise<FormErrors<FormFields> | void>
export type FormSubmit<FormFields> = (values: FormFields) => FormSubmitResult<FormFields>
