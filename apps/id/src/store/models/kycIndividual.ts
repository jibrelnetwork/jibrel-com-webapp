import { actions } from 'redux-router5'

import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import { RootState } from 'store'

import axios from '../axios'

import {
  FormSubmitResult,
} from 'store/types'

import {
  KYCIndividualState,
  KYCIndividualStatus,
  KYCIndividualValues,
} from '../types/kyc'

const OTHER_VALUE = 'other'

const getStep = (status: KYCIndividualStatus): number => {
  switch (status) {
    case KYCIndividualStatus.personal: {
      return 0
    }
    case KYCIndividualStatus.residency: {
      return 1
    }
    case KYCIndividualStatus.income: {
      return 2
    }
  }
}

const getOtherValues = (values: Partial<KYCIndividualValues>): Partial<KYCIndividualValues> => ({
  occupation: (values.occupation !== OTHER_VALUE)
    ? values.occupation
    : values.occupationOther,
  incomeSource: (values.incomeSource !== OTHER_VALUE)
    ? values.incomeSource
    : values.incomeSourceOther,
})

export const kycIndividual: ModelConfig<KYCIndividualState> = createModel<KYCIndividualState>({
  state: {
    status: KYCIndividualStatus.personal,
    values: {},
  },
  effects: (dispatch) => ({
    goBack (_: void, rootState: RootState): void {
      switch(rootState.kycIndividual.status) {
        case KYCIndividualStatus.residency: {
          this.setStatus(KYCIndividualStatus.personal)

          return
        }

        case KYCIndividualStatus.income: {
          this.setStatus(KYCIndividualStatus.residency)

          return
        }

        default: {
          dispatch(actions.navigateTo('KYC'))

          return
        }
      }
    },
    async submit (
      values: Partial<KYCIndividualValues>,
      rootState: RootState,
    ): FormSubmitResult<KYCIndividualValues> {
      try {
        const checkboxes = values.terms
          ? {
            amlAgreed: values.terms,
            uboConfirmed: values.terms,
          }
          : {}
        await axios.post(
          '/v1/kyc/individual/validate',
          {
            step: getStep(rootState.kycIndividual.status),
            ...values,
            ...checkboxes,
            ...getOtherValues(values),
          },
        )

        this.setValues({
          ...rootState.kycIndividual.values,
          ...values,
        })

        switch(rootState.kycIndividual.status) {
          case KYCIndividualStatus.personal: {
            this.setStatus(KYCIndividualStatus.residency)

            return
          }

          case KYCIndividualStatus.residency: {
            this.setStatus(KYCIndividualStatus.income)

            return
          }

          case KYCIndividualStatus.income: {
            return this.sendForm()
          }

          default:
            return
        }
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response
        if (status === 400) {
          console.log(error.formValidation)
          return error.formValidation
        }

        if (status === 409) {
          window.location.reload()
        }

        throw error
      }
    },
    async sendForm (
      _: void,
      rootState: RootState,
    ): FormSubmitResult<KYCIndividualValues> {
      const { values } = rootState.kycIndividual

      try {
        await axios.post('/v1/kyc/individual', {
          ...values,
          ...getOtherValues(values),
          amlAgreed: values.terms,
          uboConfirmed: values.terms,
        })
            .then(() => dispatch(actions.navigateTo('KYCSuccess')))
      } catch (error) {
        console.error(error)
      }
    },
    changeStatus (payload: KYCIndividualStatus): void {
      this.setStatus(payload)
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
