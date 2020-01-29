import { Offering } from './invest'

export interface Asset {
  id: string;
  name: string;
  type: string;
  symbol: string;
  decimalPlaces: number;
}

export enum InvestmentStatus {
  pending = 'pending',
}

export interface Investment {
  asset: Asset;
  offering: Offering;
  amount: string;
  createdAt: string;
  updatedAt: string;
  ownership: string;
  status: InvestmentStatus;
  isAgreedRisks: boolean;
  isAgreedSubscription: boolean;
}

export type Companies = { [key: string]: Investment }

export interface PortfolioState {
  companies: Companies;
  investments: Investment[] | undefined;
  investedAmount: string | undefined;
  isInvestmentsLoading: boolean;
  isInvestedAmountLoading: boolean;
}
