import { actions } from 'redux-router5'

import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import settings from 'app/settings'

import {
  Dispatch,
  RootState,
} from 'store'

import axios from '../axios'
import handle403 from '../utils/handle403'
import prepareCustomerData from '../utils/prepareCustomerData'
import { FormSubmitResult } from '../types/form'

import {
  InvestState,
  InvestFormFields,
  SubscriptionAgreementStatus,
} from '../types/invest'

const INTERVAL_DELAY = 3000
const INTERVAL_MULTIPLY = 1.5

export const invest: ModelConfig<InvestState> = createModel<InvestState>({
  state: {
    customerData: undefined,
    offeringData: undefined,
    bankAccountData: undefined,
    subscriptionAmount: undefined,
    isOfferingDataLoading: true,
    isCustomerDataLoading: true,
  },
  effects: (dispatch: Dispatch) => ({
    async getOfferingData(id: string, rootState: RootState): Promise<void> {
      try {
        this.setOfferingDataLoading()

        const { data } = await axios.get(`/v1/campaigns/company/${id}/offerings/active`)

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
        } else if (status === 409) {
          dispatch(actions.navigateTo('Invested'))
        }

        throw error
      }
    },
    async getCustomerData(_: void, rootState: RootState): Promise<void> {
      try {
        this.setCustomerDataLoading()

        const { data } = await axios.get('/v1/kyc/approved')

        this.setCustomerData(prepareCustomerData(data))
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 403) {
          return handle403(rootState.user.languageCode)
        } else if (status === 409) {
          dispatch(actions.navigateTo('Unverified'))

          return
        }

        throw error
      }
    },
    async sendOfferingApplication(values: InvestFormFields): FormSubmitResult<InvestFormFields> {
      const {
        id,
        ...form
      } = values

      try {
        const { data } = await axios.post(`/v1/investment/offerings/${id}/application`, form)
        const { data: application } = await axios.get(`/v1/investment/applications/${data.data.id}`, {
          'axios-retry': {
            retries: settings.API_REQUEST_MAX_ATTEMPTS,
            retryDelay: (attempts: number): number => attempts * INTERVAL_DELAY * INTERVAL_MULTIPLY,
            retryCondition: ({ data: response }) => {
              const status = response.data.subscriptionAgreementStatus

              return (
                (status === SubscriptionAgreementStatus.initial) ||
                (status === SubscriptionAgreementStatus.preparing)
              )
            },
          },
        })

        const {
          subscriptionAgreementStatus: status,
          subscriptionAgreementRedirectUrl: redirectURL,
        } = application.data

        if (status !== SubscriptionAgreementStatus.prepared) {
          throw new Error(`Incorrect DocuSign status: ${status}`)
        }

        window.location.href = redirectURL
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 409) {
          dispatch(actions.navigateTo('Invested'))

          return
        }

        throw error
      }
    },
  }),
  reducers: {
    setOfferingData: (state, payload): InvestState => ({
      ...state,
      offeringData: payload,
      isOfferingDataLoading: false,
    }),
    setOfferingDataLoading: (state): InvestState => ({
      ...state,
      isOfferingDataLoading: true,
    }),
    setCustomerData: (state, payload): InvestState => ({
      ...state,
      customerData: payload,
      isCustomerDataLoading: false,
    }),
    setCustomerDataLoading: (state): InvestState => ({
      ...state,
      isCustomerDataLoading: true,
    }),
    setBankAccountData: (state, payload): InvestState => ({
      ...state,
      bankAccountData: payload,
    }),
    setSubscriptionAmount: (state, payload): InvestState => ({
      ...state,
      subscriptionAmount: payload,
    }),
  }
})
