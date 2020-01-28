import { JibrelBankAccount } from './user'

export interface PaymentInformation {
  bankName: string;
  swiftCode: string;
  holderName: string;
  ibanNumber: string;
}

export interface PaymentsState {
  bankAccountData: JibrelBankAccount | void;
  paymentInformation: PaymentInformation | void;
  balance: string;
  depositAmount: string;
  isBalanceLoading: boolean;
}

export interface DepositFormFields extends PaymentInformation {
  amount: string;
}
