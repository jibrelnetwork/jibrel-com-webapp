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

export interface CompanyData {
  logo: string;
  slug: string;
  title: string;
  color: {
    primary: string;
    background: string;
  };
}

export type Companies = { [key: string]: CompanyData }

export interface PortfolioState {
  companies: Companies;
  investments: Investment[] | undefined;
  investedAmount: string | undefined;
  isInvestmentsLoading: boolean;
  isInvestedAmountLoading: boolean;
}
