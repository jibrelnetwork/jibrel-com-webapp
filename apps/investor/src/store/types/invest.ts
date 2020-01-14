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

export interface InvestState {
  dealTermsData: DealTermsData | void;
  isDealTermsLoading: boolean;
}
