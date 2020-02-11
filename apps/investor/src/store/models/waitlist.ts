import { FORM_ERROR } from 'final-form'

import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import { RootState } from 'store'

import axios from '../axios'
import handle403 from '../utils/handle403'
import { FormSubmitResult } from '../types/form'

import {
  WaitlistState,
  WaitlistFormFields,
} from '../types/waitlist'

export const waitlist: ModelConfig<WaitlistState> = createModel<WaitlistState>({
  state: {
    offeringData: undefined,
    isOfferingDataLoading: true,
  },
  effects: () => ({
    async getOfferingData(id: string, rootState: RootState): Promise<void> {
      try {
        this.setOfferingDataLoading()

        const { data } = await axios.get(`/v1/investment/offerings/${id}`)

        this.setOfferingData(data)
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 403) {
          return handle403(rootState.user.languageCode)
        } else if (status === 404) {
          this.setOfferingData(undefined)

          return
        }

        throw error
      }
    },
    async sendOfferingSubscription(
      values: WaitlistFormFields,
      rootState: RootState,
    ): FormSubmitResult<WaitlistFormFields> {
      const {
        id,
        ...form
      } = values

      try {
        await axios.post(`/v1/investment/offerings/${id}/subscribe`, form)
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 400) {
          return error.formValidation
        } else if (status === 403) {
          return handle403(rootState.user.languageCode)
        } else if (status === 404) {
          return { [FORM_ERROR]: 'Offering isn\'t found' }
        } else if (status === 409) {
          return { [FORM_ERROR]: 'You have subscribed already' }
        }

        throw error
      }
    },
  }),
  reducers: {
    setOfferingData: (state, payload): WaitlistState => ({
      ...state,
      offeringData: payload,
      isOfferingDataLoading: false,
    }),
    setOfferingDataLoading: (state): WaitlistState => ({
      ...state,
      isOfferingDataLoading: true,
    }),
  },
})
