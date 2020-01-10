export type API_FORM_ERROR = 'non_field_error'
export const API_FORM_ERROR: API_FORM_ERROR = 'non_field_error'

export type APIResponse<Data> = {
  data: Data;
}

export type APIFormErrors<FormFields> = {
  errors: {
    [key in keyof FormFields | API_FORM_ERROR]?: string[];
  };
}
