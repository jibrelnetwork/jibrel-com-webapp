import { actions } from 'redux-router5'

import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import {
  Dispatch,
  RootState,
} from 'store'

import { createDefaultRetryConfig } from 'utils/axios'

import axios from '../axios'
import handle403 from '../utils/handle403'
import prepareCustomerData from '../utils/prepareCustomerData'
import { FormErrors } from '../types/form'

import {
  APIResponseRetrieveInvestmentApplication,
  InvestFormFields,
  InvestState,
  SubscriptionAgreementStatus,
  InvestApplication,
} from '../types/invest'

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
    async sendOfferingApplication(values: InvestFormFields): Promise<FormErrors<InvestFormFields> | void> {
      const {
        id,
        ...form
      } = values

      try {
        const { data } = await axios.post(`/v1/investment/offerings/${id}/application`, form)
        const { data: application } = await axios.get<APIResponseRetrieveInvestmentApplication>(`/v1/investment/applications/${data.data.uuid}`, {
          'axios-retry': createDefaultRetryConfig(
            (response): boolean => {
              if ('isAxiosError' in response) {
                return false
              }

              const status = response.data.data.subscriptionAgreementStatus

              return (
                (status === SubscriptionAgreementStatus.initial) ||
                (status === SubscriptionAgreementStatus.preparing)
              )
            }
          )
        })

        const {
          subscriptionAgreementStatus,
          subscriptionAgreementRedirectUrl,
        } = application.data

        if (subscriptionAgreementStatus !== SubscriptionAgreementStatus.prepared) {
          throw new Error(`Incorrect DocuSign status: ${subscriptionAgreementStatus}`)
        }

        if (subscriptionAgreementRedirectUrl) {
          window.location.href = subscriptionAgreementRedirectUrl
        }
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 400) {
          return error.formValidation
        } else if (status === 409) {
          dispatch(actions.navigateTo('Invested'))

          return
        }

        throw error
      }
    },
    async getApplicationById(id: string): Promise<InvestApplication | void> {
      try {
        const response = await axios.get<APIResponseRetrieveInvestmentApplication>(`/v1/investment/applications/${id}`, {
          'axios-retry': createDefaultRetryConfig(
            (response): boolean => {
              if ('isAxiosError' in response) {
                return false
              }

              const status = response.data.data.subscriptionAgreementStatus

              return (
                (status !== SubscriptionAgreementStatus.success)
                && (status !== SubscriptionAgreementStatus.error)
              )
            }
          ),
        })

        if ('isAxiosError' in response) {
          throw new Error(`Incorrect investment application with id: ${id}`)
        }

        const { data: investment } = response.data

        this.setBankAccountData({ ...investment.bankAccount, depositReferenceCode: investment.depositReferenceCode })
        this.setSubscriptionAmount(investment.amount)
        this.setOfferingData(investment.offering)
        this.setApplicationAgreementStatus(investment.subscriptionAgreementStatus)

        return investment
      } catch (error) {
        if (error?.response?.status === 409) {
          dispatch(actions.navigateTo('Invested'))

          return
        }

        throw error
      }
    },
    async finishSigning(id: string): Promise<void> {
      await axios.post<APIResponseRetrieveInvestmentApplication>(`/v1/investment/applications/${id}/finish-signing`, null, {
        validateStatus: (status: number): boolean =>
          status === 200 || status === 409 // made 409 status code is accepted too
      })
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
    setApplicationAgreementStatus: (state, payload): InvestState => ({
      ...state,
      applicationAgreementStatus: payload
    })
  }
})
