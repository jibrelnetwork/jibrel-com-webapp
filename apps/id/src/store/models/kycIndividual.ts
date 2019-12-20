import { actions } from 'redux-router5'

import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import { RootState } from 'store'

import axios from '../axios'

import {
  FormSubmitResult,
} from '../types/form'

import {
  KYCIndividualState,
  KYCIndividualStatus,
  KYCIndividualValues,
} from '../types/kyc'

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
      console.log('values', values)

      try {
        await axios.post('/v1/kyc/individual/validate', values)

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
        console.error(error)
      }
    },
    async sendForm (
      _: void,
      rootState: RootState,
    ): FormSubmitResult<KYCIndividualValues> {
      try {
        await axios.post('/v1/kyc/individual', rootState.kycIndividual.values)
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
