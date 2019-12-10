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
