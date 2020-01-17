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

export interface OfferingSecurityData {
  company: {
    name: string;
  };
  uuid: string;
  type: SecurityType;
  created_at: string;
  updated_at: string;
}

export interface OfferingData {
  security: OfferingSecurityData;
  uuid: string;
  goal: string;
  status: string;
  equity: string;
  dateEnd: string;
  dateStart: string;
  createdAt: string;
  updatedAt: string;
  valuation: string;
  round: FundingRound;
  limitMinAmount: string;
  shares: number;
}

export interface Customer {
  name: string;
  streetAddress: string;
  apartment: string;
  city: string;
  postCode: string;
  country: string;
}

export interface InvestState {
  customerData: Customer | void;
  offeringData: OfferingData | void;
  isOfferingDataLoading: boolean;
  isCustomerDataLoading: boolean;
}

export interface InvestFormFields {
  id: string;
  amount: string;
  isSigned: boolean;
  isRiskAgreed: boolean;
}
