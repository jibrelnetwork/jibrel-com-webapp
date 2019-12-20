/* eslint-disable @typescript-eslint/camelcase */
export enum PhoneVerificationStatus {
  unconfirmed = 'unconfirmed',
  code_requested = 'code_requested',
  code_sent = 'code_sent',
  code_submitted = 'code_submitted',
  code_incorrect = 'code_incorrect',
  expired = 'expired',
  max_attempts_reached = 'max_attempts_reached',
  verified = 'verified',
}
/* eslint-enable @typescript-eslint/camelcase */

export type Phone = {
  status: PhoneVerificationStatus;
  number: string;
}

export enum PhoneConfirmationVariant {
  sms = 'sms',
  call = 'call',
}

export interface PhoneVerificationState {
  status: PhoneVerificationStatus | null;
  isLoading: boolean;
  maskedNumber: string;
  requestAvailableAt: Date;
  confirmationVariant: PhoneConfirmationVariant | null;
}

export type PhoneAPINumberFields = {
  country: string;
  countryCode: string;
  number: string;
}

export type PhoneAPIPinFields = {
  pin: string;
}
