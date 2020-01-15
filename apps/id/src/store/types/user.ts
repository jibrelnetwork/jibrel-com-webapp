import { LanguageCode } from '@jibrelcom/i18n'

import { KYCStatus } from './kyc'

export enum UserStatus {
  ANONYMOUS = 'ANONYMOUS',
  EMAIL_UNVERIFIED = 'EMAIL_UNVERIFIED',
  PHONE_UNVERIFIED = 'PHONE_UNVERIFIED',
  KYC_UNSET = 'KYC_UNSET',
  KYC_PENDING = 'KYC_PENDING',
  VERIFIED = 'VERIFIED',
  BANNED = 'BANNED',
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

export interface UserState {
  status: UserStatus | void;
  languageCode: LanguageCode;
  profile: Profile | void;
  limits: UserLimits | void;
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
