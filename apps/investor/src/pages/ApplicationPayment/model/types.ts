import { APIResponse } from 'store/types/api'
import { InvestApplication } from 'store/types/invest'
import { DepositOperation } from 'store/types/operations'

export type APIResponseRetrieveInvestmentApplication = APIResponse<InvestApplication>

export type InvestApplicationStore = InvestApplication | null

export type APIResponsePaymentsOperationDetails = APIResponse<DepositOperation>

export enum InitStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
