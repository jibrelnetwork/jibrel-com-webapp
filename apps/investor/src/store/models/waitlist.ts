import { actions } from 'redux-router5'
import { FORM_ERROR } from 'final-form'

import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import formatSlug from 'utils/formatters/formatSlug'

import {
  Dispatch,
  RootState,
} from 'store'

import axios from '../axios'
import handle403 from '../utils/handle403'
import { OfferingStatus } from '../types/invest'
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
  effects: (dispatch: Dispatch) => ({
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
    async checkSubscribed(id: string, rootState: RootState): Promise<boolean> {
      try {
        this.setOfferingDataLoading()

        const { data } = await axios.get(`/v1/investment/offerings/${id}/subscribe`)

        const {
          status,
          security,
        } = data.offering

        if (status === OfferingStatus.waitlist) {
          this.setOfferingData(data.offering)
        } else if (status === OfferingStatus.active) {
          dispatch(actions.navigateTo('Invest', { slug: formatSlug(security.company.name) }))
        } else {
          this.setOfferingData(undefined)
        }

        return true
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 403) {
          handle403(rootState.user.languageCode)

          return true
        } else if (status === 404) {
          this.setOfferingData(undefined)

          return true
        } else if (status === 409) {
          this.getOfferingData(id)

          return false
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
