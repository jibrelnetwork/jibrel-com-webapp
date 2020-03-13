import { APIResponse } from 'store/types/api'
import { InvestApplication } from 'store/types/invest'

export enum CardPaymentOperationStatus {
  waitingPayment = 'waiting_payment',
  processing = 'processing',
  actionRequired = 'action_required',
  completed = 'completed',
  canceled = 'canceled',
  failed = 'failed',
}

export interface CardPaymentOperation {
  uuid: string;
  amount: string;
  status: CardPaymentOperationStatus;
  redirect?: string;
}

export interface SubmitCardTokenData {
  investmentId: string;
  cardToken: string;
}

export type APIResponseDepositCardInvestmentApplication = APIResponse<CardPaymentOperation>

export type APIResponseRetrieveInvestmentApplication = APIResponse<InvestApplication>
