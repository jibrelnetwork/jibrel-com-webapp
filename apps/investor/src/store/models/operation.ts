import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import { RootState } from 'store'

import { createDefaultRetryConfig } from 'utils/axios'

import axios from '../axios'
import handle403 from '../utils/handle403'

import {
  APIResponsePaymentsOperationDetails,
  DepositOperationStatus,
  OperationState,
  OperationStateStatus,
} from '../types/operations'

import { APIResponseRetrieveInvestmentApplication } from 'store/types/invest'

export const operation: ModelConfig<OperationState> = createModel<OperationState>({
  state: {
    status: OperationStateStatus.Loading,
    operation: undefined,
    investment: undefined,
  },
  effects: {
    async fetch(id: string, rootState: RootState): Promise<void> {
      try {
        this.setStatus(OperationStateStatus.Loading)

        const { data: { data: operation } } = await axios.get<APIResponsePaymentsOperationDetails>(`/v1/payments/operations/${id}`, {
          'axios-retry': createDefaultRetryConfig<APIResponsePaymentsOperationDetails>((response) => {
            if ('isAxiosError' in response) {
              return false
            }

            const { data: operation } = response.data
            const isWaitingForPayment = operation.status === DepositOperationStatus.WaitingForPayment
            const isActionRequired = operation.status === DepositOperationStatus.ActionRequired

            return isWaitingForPayment || isActionRequired
          })
        })

        if (!operation.investmentApplication) {
          this.setSuccessfulResult({
            operation,
            investment: null,
          })

          return
        }

        const { data: { data: investment } } = await axios.get<APIResponseRetrieveInvestmentApplication>(`/v1/investment/applications/${operation.investmentApplication}`)

        this.setSuccessfulResult({
          operation,
          investment,
        })

        return
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 403) {
          return handle403(rootState.user.languageCode)
        } else if (status === 404 || status === 400) {
          this.setStatus(OperationStateStatus.Error)

          return
        }

        throw error
      }
    },
  },
  reducers: {
    setSuccessfulResult: (state, { operation, investment }): OperationState => ({
      ...state,
      status: OperationStateStatus.Success,
      operation,
      investment,
    }),
    setStatus: (state, payload: OperationStateStatus.Loading | OperationStateStatus.Error): OperationState => ({
      ...state,
      status: payload,
      operation: undefined,
      investment: undefined,
    }),
  }
})
