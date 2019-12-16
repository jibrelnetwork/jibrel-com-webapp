export enum KYCStatus {
  unverified = 'unverified',
  verified = 'verified',
  advanced = 'advanced',
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
