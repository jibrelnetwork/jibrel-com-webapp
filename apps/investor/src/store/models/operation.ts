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

export const operation: ModelConfig<OperationState> = createModel<OperationState>({
  state: {
    status: OperationStateStatus.Loading,
    operation: null,
  },
  effects: {
    async fetch(id: string, rootState: RootState): Promise<void> {
      try {
        this.setStatus(OperationStateStatus.Loading)

        const { data: { data } } = await axios.get<APIResponsePaymentsOperationDetails>(`/v1/payments/operations/${id}`, {
          'axios-retry': createDefaultRetryConfig<APIResponsePaymentsOperationDetails>((response) => {
            if ('isAxiosError' in response) {
              return false
            }

            const { data: operation } = response.data

            if (
              operation.status === DepositOperationStatus.WaitingForPayment
              || operation.status === DepositOperationStatus.ActionRequired
            ) {
              return true
            }

            return false
          })
        })

        this.setOperation(data)
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
    setOperation: (state, payload): OperationState => ({
      ...state,
      status: OperationStateStatus.Success,
      operation: payload,
    }),
    setStatus: (state, payload: OperationStateStatus.Loading | OperationStateStatus.Error): OperationState => ({
      ...state,
      status: payload,
      operation: null,
    }),
  }
})
