export interface DealTermsData {
  id: string;
  name: string;
  fundingRound: string;
  pricePerShare: string;
  typeOfSecurity: string;
  minimumInvestment: string;
  roundSize: number;
  valuation: number;
  offeredEquity: number;
  deadline: number | Date;
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
  dealTermsData: DealTermsData | void;
  isDealTermsLoading: boolean;
  isCustomerDataLoading: boolean;
}
