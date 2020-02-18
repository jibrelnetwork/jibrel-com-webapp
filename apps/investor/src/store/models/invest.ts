import {actions} from 'redux-router5'

import {createModel, ModelConfig} from '@rematch/core'

import settings from 'app/settings'

import {Dispatch, RootState} from 'store'

import axios from '../axios'
import handle403 from '../utils/handle403'
import prepareCustomerData from '../utils/prepareCustomerData'
import {FormSubmitResult} from '../types/form'

import {InvestApplication, InvestFormFields, InvestState, SubscriptionAgreementStatus} from '../types/invest'

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
        const { data: application } = await axios.get(`/v1/investment/applications/${data.data.uuid}`, {
          // @ts-ignore
          'axios-retry': {
            retries: settings.API_REQUEST_MAX_ATTEMPTS,
            retryDelay: (attempts: number): number => attempts * INTERVAL_DELAY * INTERVAL_MULTIPLY,
            retryCondition: ({ data: response }): boolean => {
              const status = response.data.subscriptionAgreementStatus

              return (
                (status === SubscriptionAgreementStatus.initial) ||
                (status === SubscriptionAgreementStatus.preparing)
              )
            },
          },
        })

        const {
          subscriptionAgreementStatus,
          subscriptionAgreementRedirectUrl,
        } = application.data

        if (subscriptionAgreementStatus !== SubscriptionAgreementStatus.prepared) {
          throw new Error(`Incorrect DocuSign status: ${subscriptionAgreementStatus}`)
        }

        window.location.href = subscriptionAgreementRedirectUrl
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
    async getApplicationById(id: string): Promise<InvestApplication | void> {
      try {
        const response = await axios.get(`/v1/investment/applications/${id}`, {
          // @ts-ignore
          'axios-retry': {
            retries: settings.API_REQUEST_MAX_ATTEMPTS,
            retryDelay: (attempts: number): number => attempts * INTERVAL_DELAY * INTERVAL_MULTIPLY,
            retryCondition: ({ data: response }): boolean => {
              if (response) {
                const status = response.data.subscriptionAgreementStatus

                return (
                  (status === SubscriptionAgreementStatus.initial) ||
                  (status === SubscriptionAgreementStatus.preparing) ||
                  (status === SubscriptionAgreementStatus.validating)
                )
              }

              return false
            },
          },
        })

        if (response.isAxiosError) {
          throw new Error(`Incorrect investment application with id: ${id}`)
        }

        const { data: responseData } = response.data

        this.setBankAccountData({ ...responseData.bankAccount, depositReferenceCode: responseData.depositReferenceCode })
        this.setSubscriptionAmount(responseData.amount)
        this.setOfferingData(responseData.offering)
        this.setApplicationAgreementStatus(responseData.subscriptionAgreementStatus)

        return response
      } catch (error) {
        if (error?.response?.status === 409) {
          dispatch(actions.navigateTo('Invested'))

          return
        }

        throw error
      }
    },
    finishSigning: async (id: string): Promise<InvestApplication> =>
       await axios.post(`/v1/investment/applications/${id}/finish-signing`, null, {
        validateStatus: (status: number): boolean =>
          status === 200 || status === 409 // made 409 status code is accepted too
      })
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
