import { Offering } from './invest'

export interface WaitlistFormFields {
  id: string;
  email: string;
  amount: string;
  isAgreedToReceiveEmails: boolean;
}

export interface WaitlistState {
  offeringData: Offering | void;
  isOfferingDataLoading: boolean;
}
