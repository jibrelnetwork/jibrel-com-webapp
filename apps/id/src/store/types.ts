import { FORM_ERROR } from 'final-form'

import { LanguageCode } from '../data/languages'

export enum KYCStatus {
  unverified = 'unverified',
  verified = 'verified',
  advanced = 'advanced',
}

export interface Profile {
  uuid: string;
  userEmail: string;
  userName?: string;
  isEmailConfirmed: boolean;
  userPhone?: string;
  isPhoneConfirmed?: boolean;
  language: LanguageCode;

  isAgreedTerms: boolean;
  isAgreedPrivacyPolicy: boolean;

  kycStatus: KYCStatus;
}

export interface UserLimit {
  leftSeconds: number;
  temproraryUnavailable: boolean;
}

export interface UserLimits {
  uploadKYCDocument: UserLimit;
  resendVerificationSMS: UserLimit;
  resendVerificationCall: UserLimit;
  resendVerificationEmail: UserLimit;
}

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface LoginFormFields {
  email: string;
  password: string;
}

export interface EmailVerificationFormFields {
  email: string;
}

export interface ForgotPasswordFormFields {
  email: string;
}

export type FormErrors<FormFields> = {
  [key in keyof FormFields & { [FORM_ERROR]: string }]?: string | void;
}

export type FormSubmitResult<FormFields> = Promise<FormErrors<FormFields> | void>
export type FormSubmit<FormFields> = (values: FormFields) => FormSubmitResult<FormFields>
