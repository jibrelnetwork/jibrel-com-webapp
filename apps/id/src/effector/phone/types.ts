import { CountryCode } from '@jibrelcom/countries/src/types'
import { API_FORM_ERROR } from '@jibrelcom/forms'

// utility

type BackendErrorMessage = {
  message: string;
  code: string;
}

export interface SuccessWrapper<T = Record<string, any>> {
  data: T;
}

export interface FailWrapper<T = Record<string, any>> {
  errors: {
    [key in keyof T | API_FORM_ERROR]?: BackendErrorMessage[];
  };
}

// FIXME: Actual example of real type of BackendWrapper
//
// type FieldError = {
//   message: string;
//   code: string;
// }
//
// interface BackendWrapper<T = any> {
//   data?: T;
//   errors?: {
//     field?: FieldError[];
//     detail?: FieldError[];
//   };
// }

// !utility

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
  maskedNumber: string;
  status?: PhoneVerificationStatus;
  requestAvailableAt?: Date;
  confirmationVariant?: PhoneConfirmationVariant;
}

export type APIRqRetrivePhone = {
  country: CountryCode;
  countryCode: string;
  number: string;
}

export type APIRqVerifyPhoneNumber = {
  pin: string;
}
