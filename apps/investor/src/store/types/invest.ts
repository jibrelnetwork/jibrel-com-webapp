import { CountryCode } from '@jibrelcom/countries/src/types'

import { APIResponse } from './api'

import { JibrelBankAccount } from './user'
import { Asset } from './portfolio'

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
    slug: string;
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
  depositReferenceCode: string | void;
  applicationAgreementStatus: SubscriptionAgreementStatus;
}

export interface InvestFormFields {
  id: string;
  amount: string;
  isSigned: boolean;
  isRiskAgreed: boolean;
}

export enum InvestmentStatus {
  Draft = 'draft',
  Pending = 'pending',
  Hold = 'hold',
  Completed = 'completed',
  Canceled = 'canceled',
  Error = 'error',
}

export interface InvestApplication {
  uuid: string;
  status: InvestmentStatus;
  amount: string;
  isAgreedRisks: boolean;
  bankAccount: JibrelBankAccount;
  depositId?: string;
  depositReferenceCode: string;
  createdAt: Date;
  updatedAt: Date;
  offering: Offering;
  asset: Asset;
  subscriptionAgreementStatus: SubscriptionAgreementStatus;
  subscriptionAgreementRedirectUrl: string;
}

export type APIResponseRetrieveInvestmentApplication = APIResponse<InvestApplication>
