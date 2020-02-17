import { Offering } from './invest'

export interface WaitlistFormFields {
  id: string;
  email: string;
  amount: string;
}

export interface WaitlistState {
  offeringData: Offering | void;
  isOfferingDataLoading: boolean;
}
