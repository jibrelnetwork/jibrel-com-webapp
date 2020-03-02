import { Offering } from './invest'

export interface Asset {
  id: string;
  name: string;
  type: string;
  symbol: string;
  decimalPlaces: number;
}

export enum InvestmentStatus {
  draft = 'draft',
  pending = 'pending',
  hold = 'hold',
  completed = 'completed',
  canceled = 'canceled',
  expired = 'expired',
  error = 'error',
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

export interface OfferingSubscription {
  offering: Offering;
  email: string;
  amount: string;
  createdAt: string;
}

export interface CurrentOffering {
  flags: {
    completed: boolean;
    active: boolean;
    waitlist: boolean;
    past: boolean;
    current: boolean;
    future: boolean;
  };
  valuation: string;
  goal_formatted: string;
  round_formatted: string;
  valuation_title: string;
  valuation_formatted: string;
}

export interface CompanyData {
  logo: string;
  slug: string;
  title: string;
  preview: string;
  tagline: string;
  location: string;
  permalink: string;
  currentOffering?: CurrentOffering;
  color: {
    primary: string;
    background: string;
  };
}

export interface PortfolioState {
  companies: CompanyData[] | undefined;
  investments: Investment[] | undefined;
  waitlist: OfferingSubscription[] | undefined;
  investedAmount: string | undefined;
  isWaitlistLoading: boolean;
  isCompaniesLoading: boolean;
  isInvestmentsLoading: boolean;
  isInvestedAmountLoading: boolean;
}
