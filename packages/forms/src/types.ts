export type API_FORM_ERROR = 'non_field_error'
export const API_FORM_ERROR: API_FORM_ERROR = 'non_field_error'
export const API_FORM_ERRORS: API_FORM_ERRORS = 'non_field_errors'

export type APIResponse<Data> = {
  data: Data;
}

export type APIFormErrors<FormFields> = {
  errors: {
    [key in keyof FormFields | API_FORM_ERROR]?: string[];
  };
}
