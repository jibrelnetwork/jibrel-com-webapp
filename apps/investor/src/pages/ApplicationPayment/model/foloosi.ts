export type FoloosiOptions = {
  reference_token: string;
  merchant_key: string;
}

export interface FoloosiInstance {
  open: () => void;
  close: () => void;
}

export interface FoloosiConstructor {
  new (options: FoloosiOptions): FoloosiInstance;
}

export enum FoloosiEventStatus {
  Success = 'success',
  Error = 'error',
}

export interface FoloosiSuccessEvent extends Event {
  data: {
    status: FoloosiEventStatus.Success;
    data: {
      transaction_no: string;
      amount: number;
      currency: string; // "USD"
      created: string; // "18-03-20"
      redirect_url: string; // "?transaction_id=FLSAPI206135e71e161e7461&optional1=3dff6033-00f7-46f0-8600-52557fbf7907&optional2=DEPOSIT-165-355-431&optional3="
    };
  };
}

export interface FoloosiErrorEvent extends Event {
  data: {
    status: FoloosiEventStatus.Error;
    data: {
      payment_status: string;
    };
  };
}

export type FoloosiEvent = FoloosiSuccessEvent | FoloosiErrorEvent

export type FoloosiHandler = (
  type: string,
  listener: (event: FoloosiEvent) => void,
  options?: boolean | AddEventListenerOptions
) => void

declare global {
  interface Window {
    Foloosipay: FoloosiConstructor;
    foloosiHandler: FoloosiHandler;
    response: string;
  }
}

export type FoloosiGlobal = {
  Foloosipay: FoloosiConstructor;
  foloosiHandler: FoloosiHandler;
  response: string;
}
