import { createModel } from '@rematch/core'

export enum KYCInvestorStatus {
  empty,
  personal,
  residency,
  income,
}

export const kycInvestor = createModel({
  state: {
    status: KYCInvestorStatus.empty,
  },
  effects: (dispatch) => ({
    status (payload): void {
      dispatch.kycInvestor.status(payload)
    }
  }),
  reducers: {
    status: (state, payload): KYCInvestorStatus => payload,
  }
})
