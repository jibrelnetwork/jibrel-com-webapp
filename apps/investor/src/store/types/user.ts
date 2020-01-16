import { LanguageCode } from '@jibrelcom/i18n'

export enum UserStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
}

export interface UserState {
  status: UserStatus | void;
  languageCode: string | void;
  profile: Profile | void;
}

export interface Profile {
  uuid: string;
  userEmail: string;
  userName?: string;
  kycStatus: string;
  userPhone?: string;
  language: LanguageCode;
  isAgreedTerms: boolean;
  isEmailConfirmed: boolean;
  isPhoneConfirmed?: boolean;
  isAgreedPrivacyPolicy: boolean;
}

export interface SignUpFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAgreedDocuments: boolean;
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

export interface ResetPasswordFormFields {
  key: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
