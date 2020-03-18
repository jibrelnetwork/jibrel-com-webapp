export enum DepositOperationType {
  Deposit = 'deposit',
}

export enum DepositOperationStatus {
  Unconfirmed = 'unconfirmed',
  WaitingForPayment = 'waiting_payment',
  Pending = 'pending',
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
}
