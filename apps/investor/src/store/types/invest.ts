import { CountryCode } from '@jibrelcom/countries/src/types'

import { JibrelBankAccount } from './user'

export enum SecurityType {
  'common_shares' = 'common_shares',
  'convertible_debt' = 'convertible_debt',
}

export enum FundingRound {
  angel = 'angel',
  seed = 'seed',
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd',
}

export enum SubscriptionAgreementStatus {
  initial = 'initial',
  preparing = 'preparing',
  prepared = 'prepared',
  validating = 'validating',
  success = 'success',
  error = 'error',
}

export enum OfferingStatus {
  pending = 'pending',
  active = 'active',
  clearing = 'clearing',
  completed = 'completed',
  canceled = 'canceled',
  waitlist = 'waitlist',
}

export interface OfferingSecurity {
  company: {
    name: string;
  };
  uuid: string;
  type: SecurityType;
  created_at: string;
  updated_at: string;
}

export interface Offering {
  security: OfferingSecurity;
  uuid: string;
  goal: string;
  price: string;
  equity: string;
  dateEnd: string;
  dateStart: string;
  createdAt: string;
  updatedAt: string;
  valuation: string;
  round: FundingRound;
  status: OfferingStatus;
  limitMinAmount: string;
  shares: number;
}

export interface Customer {
  name: string;
  streetAddress: string;
  apartment: string;
  city: string;
  postCode: string;
  country: CountryCode;
}

export interface InvestState {
  customerData: Customer | void;
  offeringData: Offering | void;
  bankAccountData: JibrelBankAccount | void;
  subscriptionAmount: number | void;
  isOfferingDataLoading: boolean;
  isCustomerDataLoading: boolean;
}

export interface InvestFormFields {
  id: string;
  amount: string;
  isSigned: boolean;
  isRiskAgreed: boolean;
}
