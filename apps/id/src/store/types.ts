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

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export type SignUpFormErrors = {
  [key in keyof SignUpFormValues]?: string | void;
}
