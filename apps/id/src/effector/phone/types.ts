import { CountryCode } from '@jibrelcom/countries/src/types'

export enum PhoneVerificationStatus {
  unconfirmed = 'unconfirmed',
  codeRequested = 'code_requested',
  codeSent = 'code_sent',
  codeSubmitted = 'code_submitted',
  codeIncorrect = 'code_incorrect',
  expired = 'expired',
  maxAttemptsReached = 'max_attempts_reached',
  verified = 'verified',
}

export type Phone = {
  status: PhoneVerificationStatus;
  number: string;
}

export enum PhoneConfirmationVariant {
  sms = 'sms',
  call = 'call',
}

export interface PhoneVerificationState {
  isLoading: boolean;
  maskedNumber: string;
  status?: PhoneVerificationStatus;
  requestAvailableAt?: Date;
  confirmationVariant?: PhoneConfirmationVariant;
}

export type PhoneAPINumberFields = {
  country: CountryCode;
  countryCode: string;
  number: string;
}

export type PhoneAPIPinFields = {
  pin: string;
}
