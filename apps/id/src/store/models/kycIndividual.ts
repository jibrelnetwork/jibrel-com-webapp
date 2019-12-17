import { createModel } from '@rematch/core'

import {
  KYCIndividualStatus,
  KYCIndividualValues,
  KYCIndividualState,
} from '../types/kyc'

export const KYC_INDIVIDUAL_SEQUENCE = [
  KYCIndividualStatus.personal,
  KYCIndividualStatus.residency,
  KYCIndividualStatus.income,
  KYCIndividualStatus.submitted,
]

export const kycIndividual = createModel({
  state: {
    status: KYCIndividualStatus.empty,
    values: {},
  },
  effects: () => ({
    next (payload, rootState): void {
      const { status: initialStatus } = rootState.kycIndividual

      const initialStatusIndex = KYC_INDIVIDUAL_SEQUENCE.indexOf(initialStatus)

      if (initialStatusIndex < 0) {
        this.setStatus(KYC_INDIVIDUAL_SEQUENCE[0])
      } else if (initialStatusIndex < KYC_INDIVIDUAL_SEQUENCE.length - 1) {
        this.setStatus(KYC_INDIVIDUAL_SEQUENCE[initialStatusIndex + 1])
      } else {
        this.setStatus(initialStatus)
      }
    },
    prev (payload, rootState): void {
      const { status: initialStatus } = rootState.kycIndividual

      const initialStatusIndex = KYC_INDIVIDUAL_SEQUENCE.indexOf(initialStatus)

      if (initialStatusIndex < 0) {
        this.setStatus(KYC_INDIVIDUAL_SEQUENCE[0])
      } else if (initialStatusIndex > 0) {
        this.setStatus(KYC_INDIVIDUAL_SEQUENCE[initialStatusIndex - 1])
      } else {
        this.setStatus(initialStatus)
      }
    },
    addValues (payload, rootState): void {
      const { values: initialValues } = rootState.kycIndividual

      this.setValues({
        ...initialValues,
        ...payload,
      })
    },
    clearValues (): void {
      this.setValues({})
    },
  }),
  reducers: {
    setStatus: (state: KYCIndividualState, payload: KYCIndividualStatus): KYCIndividualState => ({
      ...state,
      status: payload,
    }),
    setValues: (state: KYCIndividualState, payload: Partial<KYCIndividualValues>): KYCIndividualState => ({
      ...state,
      values: payload,
    }),
  }
})
