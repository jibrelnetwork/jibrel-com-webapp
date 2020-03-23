import { APIResponse } from './api'

import { InvestApplication } from './invest'

export enum DepositOperationType {
  Deposit = 'deposit',
}

export enum DepositOperationStatus {
  WaitingForPayment = 'waiting_payment',
  ActionRequired = 'action_required',
  Processing = 'processing',
  Completed = 'completed',
  Canceled = 'canceled',
  Expired = 'expired',
  Failed = 'failed',
}

export enum DepositOperationMethod {
  Card = 'card',
  WireTransfer = 'wire_transfer',
  Digital = 'digital',
  Other = 'other',
}

export type DepositOperation = {
  uuid: string;
  type:	DepositOperationType;
  status: DepositOperationStatus;
  method: DepositOperationMethod;
  feeAmount: string;
  feeAsset: string;
  feeAssetId: string;
  debitAmount: string;
  debitAsset: string;
  debitAssetId: string;
  confirmationDocument?: string;
  depositBankAccount?: string;
  depositReferenceCode?: string;
  cryptoDepositAddress?: string;
  userIban?: string;
  totalPrice?: string;
  charge?: {
    actionUrl: string;
    referenceToken: string;
  };
  investmentApplication?: string;
}

export type APIResponsePaymentsOperationDetails = APIResponse<DepositOperation>

export enum OperationStateStatus {
  Loading,
  Success,
  Error,
}

export type OperationStateSuccess = {
  status: OperationStateStatus.Success;
  operation: DepositOperation;
  investment: InvestApplication | undefined;
}

export type OperationStateLoading = {
  status: OperationStateStatus.Loading;
  operation: DepositOperation | undefined;
  investment: InvestApplication | undefined;
}

export type OperationStateError = {
  status: OperationStateStatus.Error;
  operation: undefined;
  investment: undefined;
}

export type OperationState = OperationStateSuccess | OperationStateLoading | OperationStateError
