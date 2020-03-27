export interface CheckoutValidationEvent {
  isElementValid: {
    cvv: boolean;
    cardNumber: boolean;
    expiryDate: boolean;
  };
  isValid: boolean;
}

export interface CheckoutTokenizedEvent {
  type: string;
  token: string;
  expires_on: string;
  scheme: string;
  last4: string;
  bin: string;
  card_type: string;
  card_category: string;
  issuer: string;
  issuer_country: string;
  product_id: string;
  product_type: string;
  billing_address?: string;
  phone?: string;
  name?: string;
  expiry_month: number;
  expiry_year: number;
}

export interface CheckoutEventHandlers {
  ready?: () => void;
  cardTokenized?: (event: CheckoutTokenizedEvent) => void;
}

export interface CheckoutConfig {
  style?: object;
  publicKey: string;
  namespace?: string;
  localization?: string;
  frameSelector?: string;
  debug?: boolean;
}

export interface CheckoutFrames {
  init: (options: string | CheckoutConfig & CheckoutEventHandlers) => void;
  isCardValid: () => boolean;
  submitCard: () => Promise<{ token: string }>;
  addEventHandler: <E>(
    eventName: string,
    handler: (event: E) => void,
  ) => void;
  removeEventHandler: (
    eventName: string,
    handler: Function,
  ) => boolean;
  removeAllEventHandlers: (eventName: string) => boolean;
  enableSubmitForm: () => void;
  Events: {
    READY: string;
    FRAME_ACTIVATED: string;
    FRAME_FOCUS: string;
    FRAME_BLUR: string;
    FRAME_VALIDATION_CHANGED: string;
    PAYMENT_METHOD_CHANGED: string;
    CARD_VALIDATION_CHANGED: string;
    CARD_SUBMITTED: string;
    CARD_TOKENIZED: string;
    CARD_TOKENIZATION_FAILED: string;
  };
}

export interface CheckoutFormFields {
  cardToken?: string;
  investmentId: string;
}
