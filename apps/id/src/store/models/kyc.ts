import { createModel } from '@rematch/core'

export enum KYCStatus {
  NONE = 'NONE',
  REVIEW = 'REVIEW',
  REJECTED = 'REJECTED',
  VERIFIED = 'VERIFIED',
}

export const kyc = createModel({
  state: {
    status: KYCStatus.NONE,
  },
})
