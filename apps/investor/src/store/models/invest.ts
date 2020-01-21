import { actions } from 'redux-router5'
import { LanguageCode } from '@jibrelcom/i18n'

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
import prepareCustomerData from '../utils/prepareCustomerData'
import { FormSubmitResult } from '../types/form'

import {
  InvestState,
  InvestFormFields,
} from '../types/invest'

const ID_DOMAIN = `id.${settings.FRONTEND_ROOT_DOMAIN_NAME}`

function handle403(lang: LanguageCode): void {
  window.location.href = `//${ID_DOMAIN}/${lang}/login`
}

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

        this.setBankAccountData(data.data)
        this.setSubscriptionAmount(form.amount)
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 404) {
          this.setBankAccountData(undefined)

          return
        } else if (status === 409) {
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
