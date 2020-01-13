import { API_FORM_ERROR } from '@jibrelcom/forms'

export type APIResponse<Data> = {
  data: Data;
}

export type APIFormErrors<FormFields> = {
  errors: {
    [key in keyof FormFields | API_FORM_ERROR]?: string[];
  };
}
