export enum KYCIndividualStatus {
  empty,
  personal,
  residency,
  income,
  submitted,
}

export interface PersonalValues {
  firstName: string;
  middleName?: string;
  lastName: string;
  alias?: string;
  birthDate: string;
  nationality: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportDocument: string;
}

export interface ResidencyValues {
  streetAddress: string;
  apartment: string;
  city: string;
  postCode: string;
  country: string;
  proofOfAddressDocument: string;
}

export interface IncomeValues {
  occupation: string;
  occupationOther?: string;
  incomeSource: string;
  incomeSourceOther?: string;
}

export interface KYCIndividualValues extends Partial<PersonalValues>, Partial<ResidencyValues>, Partial<IncomeValues> {}

export type KYCIndividualState = {
  status: KYCIndividualStatus;
  values: KYCIndividualValues;
}
