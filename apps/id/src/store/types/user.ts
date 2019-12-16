import { LanguageCode } from 'data/languages'
import { KYCStatus } from './kyc'

export enum UserStatus {
  ANONYMOUS = 'ANONYMOUS',
  EMAIL_UNVERIFIED = 'EMAIL_UNVERIFIED',
  PHONE_UNVERIFIED = 'PHONE_UNVERIFIED',
  VERIFIED = 'VERIFIED',
  BANNED = 'BANNED',
}

export interface UserState {
  status: UserStatus | void;
  languageCode: string | void;
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

