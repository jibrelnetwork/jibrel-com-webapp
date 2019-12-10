import { createModel } from '@rematch/core'

export enum KYCIndividualStatus {
  empty,
  personal,
  residency,
  income,
  submitted,
}

export const KYC_INDIVIDUAL_SEQUENCE = [
  KYCIndividualStatus.personal,
  KYCIndividualStatus.residency,
  KYCIndividualStatus.income,
  KYCIndividualStatus.submitted,
]

export interface PersonalValues {
  firstName: string;
  middleName?: string;
  lastName: string;
  alias?: string;
  birthDate: string;
  nationality: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportDocument: string;
}

export interface ResidencyValues {
  streetAddress: string;
  apartment: string;
  city: string;
  postCode: string;
  country: string;
  proofOfAddressDocument: string;
}

export interface IncomeValues {
  occupation: string;
  occupationOther?: string;
  incomeSource: string;
  incomeSourceOther?: string;
}

export interface KYCIndividualValues extends Partial<PersonalValues>, Partial<ResidencyValues>, Partial<IncomeValues> {}

export type KYCIndividualState = {
  status: KYCIndividualStatus;
  values: KYCIndividualValues;
}

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
