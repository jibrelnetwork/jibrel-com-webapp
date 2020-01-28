import { LanguageCode } from '@jibrelcom/i18n'

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  unverified = 'unverified',
}

export interface UserState {
  profile: Profile | void;
  status: UserStatus | void;
  languageCode: LanguageCode;
}

export interface Profile {
  uuid: string;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  kycStatus: UserStatus;
  language: LanguageCode;
  isAgreedTerms: boolean;
  isEmailConfirmed: boolean;
  isPhoneConfirmed?: boolean;
  isAgreedPrivacyPolicy: boolean;
}

export interface JibrelBankAccount {
  bankName: string;
  swiftCode: string;
  holderName: string;
  ibanNumber: string;
  accountNumber: string;
  depositReferenceCode: string;
}
