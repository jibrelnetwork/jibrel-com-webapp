import { Offering } from './invest'

export interface PortfolioState {
  offerings: Offering[];
  investedAmount: string;
  isOfferingsLoading: boolean;
  isInvestedAmountLoading: boolean;
}
